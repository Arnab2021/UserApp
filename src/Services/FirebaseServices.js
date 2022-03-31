import firestore from '@react-native-firebase/firestore';


const _checkDocumentExist_for_USER = async (chef_id , user_id) => {

    const collection = "peopleConnectedToUser"
    const primary_doc_id = 'for_user_' + user_id
    const secondary_doc_id = "chef_"+chef_id
   
    const response = await firestore().collection(collection).doc(primary_doc_id).collection("allusers").doc(secondary_doc_id).get().then(docSnapshot => {
        if (docSnapshot.exists) {
            return true
        } else {
            return false
        }
    })
    return response
}

const _checkDocumentExist_for_CHEF = async (chef_id, user_id) => {

    const collection = "peopleConnectedToChef"
    const primary_doc_id = 'for_chef_' + chef_id
    const secondary_doc_id = "user_"+user_id
    
    const response = firestore().collection(collection).doc(primary_doc_id).collection("allusers").doc(secondary_doc_id).get().then( snap => {
     
        if(snap.exists){
            return true
        }else{
            return false
        }
    } )    

    return response
}

const _insertNewData = async (data) => {

    const collection_set = {
        chef_id: data.chef_id,
        chef_name: data.chef_name,
        ChefPic: data.ChefPic,
        user_id: data.user_id,
        user_name: data.user_name,
        UserPic: data.UserPic,
        last_message: data.last_message,
        message_time: data.message_time
    }

    await firestore().collection(data.collection).doc(data.primary_doc_id).collection("allusers").doc(data.secondary_doc_id).set(collection_set)
}

const _updateData = async (data) => {

    const collection_set = {
        chef_id: data.chef_id,
        chef_name: data.chef_name,
        ChefPic: data.ChefPic,
        user_id: data.user_id,
        user_name: data.user_name,
        UserPic: data.UserPic,
        last_message: data.last_message,
        message_time: data.message_time
    }
    
    await firestore().collection(data.collection).doc(data.primary_doc_id).collection("allusers").doc(data.secondary_doc_id).update(collection_set)
}

const _handleUserinFirebase = async (data) => {

    const _docExistsCHEF = await _checkDocumentExist_for_CHEF(data.chef_id, data.user_id)
    if (!_docExistsCHEF) {
        console.log('_docExistsCHEF ==================>>>>>>>>>>>>>>>>', _docExistsCHEF);
        
        const collection = "peopleConnectedToChef"
        const primary_doc_id = 'for_chef_' + data.chef_id
        const secondary_doc_id = "user_"+data.user_id

        const insertdata = {
            collection,
            primary_doc_id,
            secondary_doc_id,
            ...data
        }

        await _insertNewData(insertdata)

    } else {

        console.log('_docExistsCHEF ========>>>>>>>>>>', _docExistsCHEF);

        const primary_doc_id = 'for_chef_' + data.chef_id
        const collection = "peopleConnectedToChef"
        const secondary_doc_id = "user_"+data.user_id

        const updatedata = {
            collection,
            primary_doc_id,
            secondary_doc_id,
            ...data
        }

        await _updateData(updatedata)

    }

    /******************************       USER       ****************************************/

    const _docExistsUSER = await _checkDocumentExist_for_USER(data.chef_id,data.user_id)
    if (!_docExistsUSER) {
        console.log('_docExistsUSER ========>>>>>>>>>>', _docExistsUSER);

        const primary_doc_id = 'for_user_' + data.user_id
        const collection = "peopleConnectedToUser"
        const secondary_doc_id = "chef_"+data.chef_id

        const insertdata = {
            collection,
            primary_doc_id,
            secondary_doc_id,
            ...data
        }

        await _insertNewData(insertdata)

    } else {
        console.log('_docExistsUSER ========>>>>>>>>>>', _docExistsUSER);

        const primary_doc_id = 'for_user_' + data.user_id
        const collection = "peopleConnectedToUser"
        const secondary_doc_id = "chef_"+data.chef_id

        const updatedata = {
            collection,
            primary_doc_id,
            secondary_doc_id,
            ...data
        }

        await _updateData(updatedata)
    }

}




export { _handleUserinFirebase }