const Visitor = require("../models/Visitor.model");
const {
  createVisitorSchema,
  updateVisitorSchema,
} = require("../validators/visitor.validator");

const createVisitor = async (req, res) => {
  try {
    const data = createVisitorSchema.parse(req.body);

    const visitor = await Visitor.create({
      ...data,
      createdBy: req.user.id || req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Visitor created successfully",
      visitor,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.find({
      createdBy: req.user.id || req.user._id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: visitors.length,
      visitors,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getVisitorById = async (req, res) => {
  try {
    const visitor = await Visitor.findOne({
      _id: req.params.id,
      createdBy: req.user.id || req.user._id,
    });

    if (!visitor) {
      return res.status(404).json({
        success: false,
        message: "Visitor not found",
      });
    }

    return res.status(200).json({
      success: true,
      visitor,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateVisitor = async (req, res) => {
  try {
    const data = updateVisitorSchema.parse(req.body);

    const visitor = await Visitor.findOneAndUpdate(
      {
        _id: req.params.id,
        createdBy: req.user.id || req.user._id,
      },
      data,
      { new: true, runValidators: true }
    );

    if (!visitor) {
      return res.status(404).json({
        success: false,
        message: "Visitor not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Visitor updated successfully",
      visitor,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.id || req.user._id,
    });

    if (!visitor) {
      return res.status(404).json({
        success: false,
        message: "Visitor not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Visitor deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const checkoutVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.findOneAndUpdate(
      {
        _id: req.params.id,
        createdBy: req.user.id || req.user._id,
      },
      { checkOutTime: new Date() },
      { new: true }
    );

    if (!visitor) {
      return res.status(404).json({
        success: false,
        message: "Visitor not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Visitor checked out successfully",
      visitor,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createVisitor,
  getVisitors,
  getVisitorById,
  updateVisitor,
  deleteVisitor,
  checkoutVisitor,
};