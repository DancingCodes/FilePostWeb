import request from '@/utils/request'

export const uploadImage = (data: FormData) => request.post('/uploadFile/uploadImage', data, {
    headers: {
        'content-type': 'multipart/form-data'
    }
})