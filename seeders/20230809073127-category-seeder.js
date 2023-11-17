"use strict";
require('dotenv').config();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "Categories",
            [
                {
                    name: "Thời trang nam",
                    image: process.env.WEB_URL + "/images/categories/T_Shirt.png",
                },
                {
                    name: "Điện thoại & phụ kiện",
                    image: process.env.WEB_URL + "/images/categories/phone.png",
                },
                {
                    name: "Thời trang nữ",
                    image: process.env.WEB_URL + "/images/categories/female_fashion.png",
                },
                {
                    name: "Thiết bị điện tử",
                    image: process.env.WEB_URL + "/images/categories/electronic_device.png",
                },
                {
                    name: "Máy tính & laptop",
                    image: process.env.WEB_URL + "/images/categories/laptop.png",
                },
                {
                    name: "Máy ảnh và máy quay phim",
                    image: process.env.WEB_URL + "/images/categories/camera.png",
                },
                {
                    name: "Đồng hồ",
                    image: process.env.WEB_URL + "/images/categories/watcher.png",
                },
                {
                    name: "Giày dép nam",
                    image: process.env.WEB_URL + "/images/categories/shoes.png",
                },
                {
                    name: "Thiết bị điện gia dụng",
                    image: process.env.WEB_URL + "/images/categories/household_electrical.png",
                },
                {
                    name: "Thể thao & du lịch",
                    image: process.env.WEB_URL + "/images/categories/sport.png",
                },
                {
                    name: "Ô tô & xe máy & xe đạp",
                    image: process.env.WEB_URL + "/images/categories/motorbike.png",
                },
                {
                    name: "Mẹ & Bé",
                    image: process.env.WEB_URL + "/images/categories/baby.png",
                },
                {
                    name: "Nhà cửa và đời sống",
                    image: process.env.WEB_URL + "/images/categories/cooking_tool.png",
                },
                {
                    name: "Sắc đẹp",
                    image: process.env.WEB_URL + "/images/categories/makeup.png",
                },
                {
                    name: "Sức khỏe",
                    image: process.env.WEB_URL + "/images/categories/healthy.png",
                },
                {
                    name: "Giày dép nữ",
                    image: process.env.WEB_URL + "/images/categories/female_shoes.png",
                },
                {
                    name: "Túi ví nữ",
                    image: process.env.WEB_URL + "/images/categories/bags.png",
                },
                {
                    name: "Phụ kiện và trang sức nữ",
                    image: process.env.WEB_URL + "/images/categories/jewelry.png",
                },
                {
                    name: "Bách hóa online",
                    image: process.env.WEB_URL + "/images/categories/food.png",
                },
                {
                    name: "Nhà sách online",
                    image: process.env.WEB_URL + "/images/categories/book.png",
                },
                {
                    name: "Thời trang trẻ em",
                    image: process.env.WEB_URL + "/images/categories/baby_clothes.png",
                },
                {
                    name: "Balo & túi ví nam",
                    image: process.env.WEB_URL + "/images/categories/male_bag.png",
                },
                {
                    name: "Đồ chơi",
                    image: process.env.WEB_URL + "/images/categories/toy.png",
                },
                {
                    name: "Giặt giũ & chăm sóc nhà cửa",
                    image: process.env.WEB_URL + "/images/categories/laundry.png",
                },
                {
                    name: "Chăm sóc thú cưng",
                    image: process.env.WEB_URL + "/images/categories/pet.png",
                },
                {
                    name: "Vouchers & dịch vụ",
                    image: process.env.WEB_URL + "/images/categories/voucher.png",
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Categories", null, {});
    },
};
