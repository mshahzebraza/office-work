import poModel from "../models/poModel";

export const deletePO = async (req, res) => {
    const { poUUID } = req.query;
    if (!poUUID) throw new Error('Please provide a valid poUUID')

    // ?? delete/unlink all linked items from the deleted PO
    const deletedPO = await poModel.findByIdAndDelete(poUUID, { new: true });

    // if deletion fails, return error
    if (!deletedPO) throw new Error('Unsuccessful to delete PO!')

    // return success message
    res.status(200).json({
        success: true,
        message: "PO deleted successfully",
        data: { deletedPO },
        error: null
    })

};
