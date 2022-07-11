export class LoginCredentials {
  name: string;
  password: string;
}

export class RegisterCredentials {
  firstname: string;
  lastname: string;
  name: string;
  password: string;
  email: string;
}

export class SubmitUsernameRequest {
  username: string;
}

export class UpdatePasswordRequest {
  username: string;
  verificationCode: string;
  newPassword: string;
}
