const { visibilityEnum, accessEnum, requestTypeEnum } = require('../../../models/constants');

class CollectionReadService {
    constructor(
        collectionRepository,
        collectionCacheRepository,
        urlReadService,
        userReadService
    ) {
        this.collectionRepository = collectionRepository;
        this.collectionCacheRepository = collectionCacheRepository;
        this.urlReadService = urlReadService;
        this.userReadService = userReadService;
    }

    async findCollection(collectionString, userid = null, useName = false, requestType = requestTypeEnum.VIEW) {
        let collection = await this.collectionCacheRepository.getCollection(collectionString);
        const user = !userid ? null : await this.userReadService.findUser(userid, { lean: true });

        if (!collection) {
            collection = await this.collectionRepository.findByUrl(collectionString);

            if (!collection && useName) {
                collection = await this.collectionRepository.findByName(collectionString);
            }

            if (collection) {
                await this.collectionCacheRepository.setCollection(
                    collection.collectionUrl,
                    collection
                );
            }
        }

        if (!collection) {
            throw new Error("Collection not found.");
        }

        const userAccess = this.getUserAccessLevel(collection, user);
        this.verifyAccessToRequestType(userAccess, requestType);
        
        return [collection, userAccess];
    }

    async getCollection(collectionString, userid = null, requestType = requestTypeEnum.VIEW) {
        const [collection, userAccess] = await this.findCollection(collectionString, userid, false, requestType);

        const collectionWithData = collection.urls
            ? collection
            : await this.mapCollectionData(collection);

        return [collectionWithData, userAccess];
    }

    async mapCollectionData(collection) {
        const urls = await this.urlReadService.findByShortUrls(collection.shortUrlList);
        const collectionData = collection.toObject ? collection.toObject() : collection;

        const mappedCollection = {
            ...collectionData,
            urls: collection.shortUrlList.map(shortUrl =>
                urls.find(url => url.shortUrl === shortUrl) || null
            )
        };

        // Cache the mapped collection
        await this.collectionCacheRepository.setCollection(
            collection.collectionUrl,
            mappedCollection
        );

        return mappedCollection;
    }

    async getUserCollections(userId) {
        let collections = await this.collectionCacheRepository.getUserCollections(userId);
        if (collections) {
            return collections;
        }

        const user = await this.userReadService.findUser(userId, { lean: true });
        const urls = user.collections;
        collections = [];
        const uncachedUrls = [];

        // Check cache for each collection
        await Promise.all(
            urls.map(async (url) => {
                const cached = await this.collectionCacheRepository.getCollection(url);
                if (cached && cached.urls) {
                    collections.push(cached);
                } else {
                    uncachedUrls.push(url);
                }
            })
        );

        if (uncachedUrls.length > 0) {
            const dbCollections = await this.collectionRepository.findByUrls(uncachedUrls);
            
            // Map and cache uncached collections
            const mappedCollections = await Promise.all(
                dbCollections.map(collection => this.mapCollectionData(collection))
            );
            
            collections.push(...mappedCollections);
        }

        // Cache the full user collections result
        await this.collectionCacheRepository.setUserCollections(userId, collections);

        return collections;
    }

    getUserId(req) {
        return req.user.userId || null;
    }

    getUserAccessLevel(collection, user) {
        if (user && collection.ownerName === user.email) {
            return accessEnum.OWNER;
        }

        if (this.isPublic(collection.visibility)) {
            return collection.visibility === visibilityEnum.PUBLIC
                ? accessEnum.FULL
                : accessEnum.VIEW_ONLY;
        }

        if (user && collection.accessList.includes(user.email)) {
            return collection.visibility === visibilityEnum.PRIVATE
                ? accessEnum.FULL
                : accessEnum.VIEW_ONLY;
        }

        return accessEnum.NONE;
    }

    isPublic(visibility) {
        return visibilityEnum.PUBLIC === visibility || visibilityEnum.PUBLIC_VO === visibility;
    }

    verifyAccessToRequestType(access, requestType) {
        if (access === accessEnum.NONE) {
            throw new Error("You do not have access to this collection.");
        }

        const canModify = access === accessEnum.OWNER || access === accessEnum.FULL;
        const isModifyRequest = requestType !== requestTypeEnum.VIEW;

        if (isModifyRequest && !canModify) {
            throw new Error("You do not have access to modify this collection.");
        }
    }
}

module.exports = CollectionReadService; 