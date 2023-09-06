const { showUserById, updateUserById } = require("../CRUD/user");
const jwt = require("jsonwebtoken");

async function getUserById(request, response) {
    try {
        // const decode = jwt.verify(request.body.token, process.env.JWT_SECRET_KEY);
        const token = request.headers.authorization.split(" ")[1];

        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

        //Bearer {token}
        const profile = await showUserById(decode.id);
        return response.status(200).json({
            message: "Success get profile",
            profile: profile,
        });
    } catch (error) {
        return response.status(500).json({
            message: "Something went wrong!",
            error: error,
        });
    }
}

async function updateAva(request, response)
{
    try {
        const token = request.headers.authorization.split(" ")[1];
            
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const userID = decode.id;

        var profile = await showUserById(userID);

        const updateUser = {
            name : profile.name,
            gender : profile.gender,
            birthday : profile.birthday,
            email : profile.email,
            telephone : profile.telephone,
            avatar_url : process.env.WEB_URL + "/images/avatars/" + request.body.image,
            password : profile.password,
            isAdmin : profile.isAdmin,
            deletedAt : profile.deletedAt,
            createdAt : profile.createdAt,
            updatedAt : profile.updatedAt
        }

        updateUserById(updateUser, userID);

        return response.status(200).json({
            message : "Change avatar successfull",
            profile : profile
        })

    } catch (error) {
        return response.status(500).json({
            message : "Something went wrong",
            error : error
        })
    }
}

// async function getProfileByToken()

module.exports = {
    getUserById : getUserById,
    updateAva : updateAva,
};
