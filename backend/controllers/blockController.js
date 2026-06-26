const Block = require("../models/Block");
const CryptoJS = require("crypto-js");

const createBlock = async (
  voteData
) => {
  try {

    const previousBlock =
      await Block.findOne()
        .sort({
          index: -1,
        });

    const previousHash =
      previousBlock
        ? previousBlock.voteHash
        : "000000";

    const voteHash =
      CryptoJS.SHA256(
        JSON.stringify(voteData)
      ).toString();

    const block =
      await Block.create({
        index:
          previousBlock
            ? previousBlock.index + 1
            : 1,

        previousHash,

        voteHash,
      });

    return block;

  } catch (error) {

    console.log(
      error.message
    );

  }
};

const getBlocks = async (req, res) => {
  try {
    const blocks =
      await Block.find()
        .sort({
          index: 1,
        });

    res.status(200).json(blocks);
  } catch (error) {
    res.status(500).json({
      message:
        error.message,
    });
  }
};

module.exports = {
  createBlock,
  getBlocks,
}
