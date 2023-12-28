import user_schema from "../../schemas/user-schema";
import { c_error } from "../../utilities";

const user_service = {
  get_user: async (params: user_selection_params): Promise<USER_PROFILE> => {
    console.log(params);
    const user = await user_schema.findOne({ email: params?.email as string });
    if (user) return user;
    throw new c_error("User not found", 404);
  },
};

export default user_service;
