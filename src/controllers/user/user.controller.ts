import user_service from "../../services/user/user.service";
import { c_error } from "../../utilities";

const user_controller = {
  gmail_auth_controller: async (
    params: gmail_auth_params,
  ): Promise<USER_PROFILE> => {
    try {
      const response = await user_service.get_user(params);

      if (params.email) return response;
      throw new c_error("Invalid input: provided email is invalid", 403);
    } catch (error) {
      throw error;
    }
  },
};

export default user_controller;
