const visibilityEnum = {
    PRIVATE_VO: 0,
    PRIVATE: 1,
    PUBLIC_VO: 2,
    PUBLIC: 3, 
};

const requestTypeEnum = {
    MODIFY_SETTING: 0,
    MODIFY_ITEM: 1,
    VIEW: 2,
};

const accessEnum = {
    OWNER: 0,
    FULL: 1,
    VIEW_ONLY: 2,
    NONE: 3,
};

module.exports = { 
    visibilityEnum,
    requestTypeEnum,
    accessEnum
};
