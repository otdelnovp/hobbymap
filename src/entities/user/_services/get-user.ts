import { userRepository } from "../_repositories/user";
import { createUserAbility } from "../_domain/ability";
import { AuthorizationError } from "@/shared/lib/errors";
import { SharedSession, SharedUser, UserId } from "@/kernel/domain/user";

type GetUser = {
  userId: UserId;
  session: SharedSession;
};

export class GetUserService {
  async exec({ userId, session }: GetUser): Promise<SharedUser> {
    const userAbility = createUserAbility(session);

    if (!userAbility.canGetUser(userId)) {
      throw new AuthorizationError();
    }

    return await userRepository.getUserById(userId);
  }
}

export const getUserService = new GetUserService();
