export const DELETE_CATCONTENT = 'DELETE_CATCONTENT';
export const CREATE_CATCONTENT = 'CREATE_CATCONTENT';
export const UPDATE_CATCONTENT = 'UPDATE_CATCONTENT';

export const deleteCatContent = (catContentId) => {
    return { type: DELETE_CATCONTENT, catContentId: catContentId };
}

export const createCatContent = (title, color, subId, evaluation, signs, management, medications,references,image) => {
    return {
        type: CREATE_CATCONTENT, 
        catContentData:{
            title: title,
            color: color,
            subId: subId,
            evaluation: evaluation,
            signs: signs,
            management: management,
            medications: medications,
            references: references,
            image: image
        }
    };
};

export const updateCatContent = (id, title, evaluation, signs, management, medications, references, image) => {
    return {
        type: UPDATE_CATCONTENT,
        catContentId: id,
        catContentData: {
            title: title,
            evaluation: evaluation,
            signs: signs,
            management: management,
            medications: medications,
            references: references,
            image: image
        }
    };
};