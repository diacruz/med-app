export const DELETE_CATCONTENT = 'DELETE_CATCONTENT';
export const CREATE_CATCONTENT = 'CREATE_CATCONTENT';
export const UPDATE_CATCONTENT = 'UPDATE_CATCONTENT';
import {CATCONTENT} from '../../data/categoriesData';

export const deleteCatContent = (catContentId) => {
    return { type: DELETE_CATCONTENT, catContentId: catContentId };
}

export const createCatContent = (title, color, subId, evaluation, signs, management, medications,references,image) => {
    return async dispatch =>{
        // you can access here any async code!
       const response = await fetch('https://med-app-519aa.firebaseio.com//categories.json',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                color,
                subId,
                evaluation,
                signs,
                management,
                medications,
                references,
                image
            })
        });

        const resData = await response.json();
        console.log(resData);

        dispatch({
            type: CREATE_CATCONTENT, 
            catContentData:{
                id: resData.name,
                title: title,
                color: color,
                subId: subId,
                evaluation: evaluation,
                signs: signs,
                management: management,
                medications: medications,
                references: references,
                image: image
        }});
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