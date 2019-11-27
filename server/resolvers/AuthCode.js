export default {
  AuthCode: {
    user: async ({ user }, args, { models: { userModel } }, info) => {
      const foundUser = await userModel.findById({ _id: user }).exec();
      return foundUser;
    }
  }
};
