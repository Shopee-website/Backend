const multer = require("multer");

function uploadImage(kindImage, imageNames){
    const storage = multer.diskStorage({
        destination: (request, file, cb) => {
            cb(null, process.cwd() + "/public/images/" + kindImage + "/"); // Thư mục để lưu trữ tệp tin tải lên.
        },
        filename: (request, file, cb) => {
            const imageName = Date.now() + file.originalname.split(' ').join('')
            imageNames.push(imageName)
            cb(null, imageName); // Tạo tên tệp tin duy nhất.
        },
    });
    return multer({ storage });
}

module.exports = {
    uploadImage : uploadImage,
}
    