const asyncHandler = require("express-async-handler");

const mongoose = require("mongoose");

const ProductCategory = require("../model/productCategory.js");

const productCategoryCtrl = {
  createProductCategory: asyncHandler(async (req, res) => {

        const {title} = req.body;


        if(!title){
            throw new Error("Empty is not allowed")
        }

        await ProductCategory.create({title})


        res.json({message:"Added CATEGORY succesfully"})
  }),

  getAllProductCategory: asyncHandler(async(req, res) =>{

        const productCategories = await ProductCategory.find();


        res.json({ productCategories})

  }),


  deleteProductCategory :asyncHandler(async(req, res) =>{

    const {id} = req.params;


    await ProductCategory.findByIdAndDelete(id);


    res.json({message:"delete succesfully"})

  })

//   deleteCategory: asyncHandler(async (req, res) => {
//     //get the id
//     const { id } = req.params;

//     //get Category collection deleted document in object form
//     const deletedCategory = await Category.findByIdAndDelete(id);

//     res.json({ message: "Deleted Certain Catgeory", deletedCategory });

//     console.log(deletedCategory);
//   }),

//   getAllCategory: asyncHandler(async (req, res) => {

//     console.log("I am inside get all category");
//     const Categories = await Category.find();

//     res.json({  Categories }).status(203);
//   }),

//   getCertainCategory: asyncHandler(async (req, res) => {
//     console.log("I am inside certain category controller");

//     const { slug } = req.params;

//     // Validate the `id`
//     // if (!mongoose.Types.ObjectId.isValid(id)) {
//     //   return res.status(400).json({ message: "Invalid category ID" });
//     // }

//     const category = await Category.find({slug});

//     if (!category) {
//       return res.status(404).json({ message: "Category not found" });
//     }

//     console.log(category);

//     res
//       .status(201)
//       .json({ message: "Certain Category Fetched Successfully", category });
//   }),

//   EditCertainCategory: asyncHandler(async (req, res) => {
//     const { id } = req.params;
//     const { name } = req.body;

    
//     const slug = name.toLowerCase();

//     const categoryDocument = await Category.findById(id);

//     if (!categoryDocument) {
//       return res.status(404).json({ message: "Category not found" });
//     }

//     if (categoryDocument.name === name) {
//       return res.json({
//         message: "Category name is unchanged, please modify it",
//       });
//     }

//     const afterUpdation = await Category.findByIdAndUpdate(
//       id,
//       { name, slug },
//       { new: true }
//     );

//     res.status(202).json({
//       message: "Updated successfully",
//       categoryDocumentAfterUpdation: afterUpdation,
//     });
//   }),

//   getCertainCategoryProducts: asyncHandler(async (req, res) => {
//     const { id } = req.params;

//     // Validate the `id`
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ message: "Invalid category ID" });
//     }

//     const category = await Category.findById(id).populate({
//       path: "posts",
//     });

//     if (!category) {
//       return res.status(404).json({ message: "Category not found" });
//     }

//     console.log(category);

//     res
//       .status(201)
//       .json({ message: "Certain Category Fetched Successfully", category });
//   }),
};

module.exports = productCategoryCtrl;
