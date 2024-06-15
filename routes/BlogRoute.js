const express = require("express");
const router = express.Router();
const upload = require("../multer");
const BlogModel = require("../models/BlogsModel");

/**
 * @openapi
 * /blogs/create:
 *  post:
 *      tag:
 *          -blog
 *      summary: "Create a new blog"
 *      consumes:
 *           - "multipart/form-data"
 *      parameters:
 *           - in: formData
 *           - name: image
 *           - type: file
 *           - required: true
 *           - description: "Image file for the blog"
 *           - in: formData
 *           - name: title
 *           - type: string
 *           - required: true
 *           - description: "Title of the blog"
 *           - in: formData
 *           - name: description
 *           - type: string
 *           - required: true
 *           - description: "Description of the blog"
 *      responses:
 *       200:
 *         description: "Success"
 *         schema:
 *           type: object
 *           properties:
 *             blog:
 *               type: object
 *               description: "Created blog object"
 *      404:
 *         description: "Validation Error"
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: "Error message"
 *      500:
 *         description: "Internal Server Error"
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: "Error message"
 *
 *
 */

router.post("/create", upload.single("image"), async (req, res) => {
  try {
    let { title, description, showOnScreen } = req.body;

    if (showOnScreen) {
      if (typeof showOnScreen == "boolean") {
      } else if (showOnScreen == "true") {
        showOnScreen = true;
      } else {
        showOnScreen = false;
      }
    } else {
      showOnScreen = false;
    }

    if (title.trim() == "" || description.trim() == "") {
      return res
        .status(404)
        .send({ message: "Title and description is required" });
    }
    let imagePath = req?.file?.filename;
    imagePath = imagePath ? "/uploads/" + imagePath : null;
    if (imagePath == null) {
      return res.status(404).send({ message: "Image is required" });
    }
    let createBlog = await BlogModel.create({
      title,
      image: imagePath,
      description,
      showOnScreen,
    });
    return res.status(200).send({ blog: createBlog });
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
});

/**
 * @openapi
 * /blogs:
 *    get:
 *     summary: "Get all blogs"
 *     responses:
 *       200:
 *         description: "Success"
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             description: "Blog object"
 *       500:
 *         description: "Internal Server Error"
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: "Error message"
 *
 */
router.get("/", async (req, res) => {
  try {
    const blogs = await BlogModel.findAll();
    return res.status(200).send(blogs);
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
});

/**
 * @openapi
 * /blogs/{id}:
 *   get:
 *     summary: "Get a blog by ID"
 *     parameters:
 *       - in: path
 *         name: id
 *         type: integer
 *         required: true
 *         description: "ID of the blog to retrieve"
 *     responses:
 *       200:
 *         description: "Success"
 *         schema:
 *           type: object
 *           properties:
 *             blog:
 *               type: object
 *               description: "Blog object"
 *       404:
 *         description: "Not Found"
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: "Error message"
 *       500:
 *         description: "Internal Server Error"
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: "Error message"
 *
 */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let findBlog = await BlogModel.findOne({ where: { id } });
    if (!findBlog) {
      return res
        .status(400)
        .send({ message: "Blog not found with this id" + id });
    }
    return res.status(200).send(findBlog);
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
});

/**
 * @openapi
 * /blogs/{id}:
 *   delete:
 *     summary: "Delete a blog by ID"
 *     parameters:
 *       - in: path
 *         name: id
 *         type: integer
 *         required: true
 *         description: "ID of the blog to delete"
 *     responses:
 *       200:
 *         description: "Success"
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: "Success message"
 *       404:
 *         description: "Not Found"
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: "Error message"
 *       500:
 *         description: "Internal Server Error"
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: "Error message"
 */
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await BlogModel.findByPk(id);
    if (!blog) {
      return res.status(404).send({ message: "Blog not exist" });
    }
    await blog.destroy();
    return res.status(200).send({ message: "Blog deleted successfully" });
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
});

/**
 * @openapi
 * /blogs/{id}:
 *   put:
 *     summary: "Update a blog by ID"
 *     consumes:
 *       - "multipart/form-data"
 *     parameters:
 *       - in: path
 *         name: id
 *         type: integer
 *         required: true
 *         description: "*ID of the blog to update"
 *       - in: formData
 *         name: image
 *         type: file
 *         required: false
 *         description: "New image file for the blog"
 *       - in: formData
 *         name: title
 *         type: string
 *         required: false
 *         description: "New title of the blog"
 *       - in: formData
 *         name: description
 *         type: string
 *         required: false
 *         description: "New description of the blog"
 *     responses:
 *       200:
 *         description: "Success"
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: "Success message"
 *             updatedBlog:
 *               type: object
 *               description: "Updated blog object"
 *       404:
 *         description: "Not Found"
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: "Error message"
 *       500:
 *         description: "Internal Server Error"
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               description: "Error message"
 *
 *
 */
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    let { title, description, showOnScreen } = req.body;
    let imagePath = req?.file?.filename;
    imagePath = imagePath ? "/uploads/" + imagePath : null;
    console.log("Hello world");
    const blog = await BlogModel.findByPk(id);
    if (!blog) {
      return res.status(404).send({ message: "Blog not exist" });
    } else {
      if (showOnScreen !== undefined) {
        if (typeof showOnScreen == "boolean") {
        } else if (showOnScreen == "true") {
          showOnScreen = true;
        } else {
          showOnScreen = false;
        }
      } else {
        showOnScreen = blog.showOnScreen;
      }

      blog.title = title || blog.title;
      blog.image = imagePath || blog.image;
      blog.description = description || blog.description;
      blog.showOnScreen = showOnScreen;
      await blog.save();
      return res
        .status(200)
        .send({ message: "Blog updated successfully", updatedBlog: blog });
    }
  } catch (error) {
    console.error("Error updating blog:", error);
    return res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = router;
