const Collection = require('../models/Collection');
const { visibilityEnum, requestTypeEnum, accessEnum } = require('../models/constants');
const { generateShortUrl } = require('./common');

const updateCollectionMetadataLogic = async (collection) => {
    // TODO
};

const attemptToAddCollection = async (collectionName, collectionUrl, user, visibility) => {
    try {
        const newCollection = new Collection({
            collectionUrl: collectionUrl || generateShortUrl(),
            collectionName,
        });

        if (Object.values(visibilityEnum).includes(visibility)) {
            newCollection.visibility = visibility;
        }
        if (user) {
            newCollection.ownerName = user.email;
            newCollection.accessList = [user.email]
        }
      
        await newCollection.save();
        if (user) {
            user.collections.push({collectionUrl, visibility})
        }
        return newCollection;
    } catch (err) {
        if (err.code === 11000) { 
            attemptToAddCollection(collectionName, generateShortUrl(), user, visibility);
        } else {
            throw err;
        }
    }
};

const findCollectionAuth = async (collectionString, user = null, useName = false, requestType = requestTypeEnum.VIEW) => {
    var collection = await Collection.findOne({ collectionUrl: collectionString });
    if (!collection && useName) {
        collection = await Collection.findOne({ collectionName: collectionString });
    }

    if (collection) {
        const userAccess = getUserAccessLevel(collection, user);
        verifyAccessToReqestType(userAccess, requestType);
        return [collection, userAccess];
    }
    else {
        throw new Error("Collection not found.");
    }
}

const getUserAccessLevel = (collection, user) => {
    const vis = collection.visibility;
    var res = accessEnum.NONE;

    if (!user && isPublic(vis)) {
        if (vis === visibilityEnum.PUBLIC) {
            res = accessEnum.FULL;
        }
        else if (vis === visibilityEnum.PUBLIC_VO) {
            res = accessEnum.VIEW_ONLY;
        }
    }
    else if (user) {
        if (collection.ownerName === user.email) {
            res = accessEnum.OWNER;
        }
        else {
            var found = false;
            collection.accessList.forEach((u) => {
                if (u === user.email) {
                    found = true;
                }
            });
            if (found && vis === visibilityEnum.PRIVATE) {
                res = accessEnum.FULL;
            }
            else if (found && vis === visibilityEnum.PRIVATE_VO) {
                res = accessEnum.VIEW_ONLY;
            }
        }
    }
    return res;
};

const isPublic = (visibility) => {
    return visibilityEnum.PUBLIC === visibility || visibilityEnum.PUBLIC_VO === visibility;
}

const verifyAccessToReqestType = (access, requestType) => {
    if (access === accessEnum.NONE) {
        throw new Error("You do not have access to this collection.");
    } else if (access === accessEnum.VIEW_ONLY && !viewOnlyAccessRequests(requestType)) {
        throw new Error("You do not have access to modify this collection.");
    } else if (access === accessEnum.FULL && !fullAccessRequests(requestType)) {
        throw new Error("You do not have access to modify this collection.");
    }
};

const viewOnlyAccessRequests = (rt) => {
    return rt === requestTypeEnum.VIEW;
}

const fullAccessRequests = (rt) => {
    return viewOnlyAccessRequests(rt) && rt === requestTypeEnum.MODIFY_ITEM;
}

module.exports = {
    updateCollectionMetadataLogic,
    attemptToAddCollection,
    findCollectionAuth,
};
  