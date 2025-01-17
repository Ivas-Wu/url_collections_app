const Collection = require('../models/Collection');
const { visibilityEnum, resultEnum } = require('../models/constants');
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
            newCollection.ownerName = user.username || user.email;
            newCollection.accessList = [user.username]
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

const findCollectionAuth = async (collectionUrl, user) => {
    const collection = await Collection.findOne({ collectionUrl });
    let returnData = resultEnum.NO_ACCESS;
    if (!collection) {
        returnData = resultEnum.NOT_FOUND;
    }
    else if (collection.visibility == visibilityEnum.PRIVATE || collection.visibility == visibilityEnum.PRIVATE_VO) {
        if (user) {
            if (collection.ownerName === user.username) {
                returnData = collection;
            }
            else {
                collection.accessList.forEach((u) => {
                    if (u === user.username) {
                        returnData = collection;
                    }
                });
            }
        }
    } //TODO add view only access message
    else {
        returnData = collection;
    }

    return returnData;
}

const verifyCollection = async (collection) => {
    if (collection == resultEnum.NOT_FOUND) {
        throw new Error("Collection not found.");
    } else if (collection == resultEnum.NO_ACCESS) {
        throw new Error("You do not have access to this collection.");
    } else if (collection == resultEnum.NO_MODIFY_ACCESS) {
        throw new Error("You do not have access to modify this collection.");
    } else if (!collection.collectionUrl) {
        throw new Error("Bad data.");
    }

    return collection;
};


module.exports = {
    updateCollectionMetadataLogic,
    attemptToAddCollection,
    findCollectionAuth,
    verifyCollection
};
  