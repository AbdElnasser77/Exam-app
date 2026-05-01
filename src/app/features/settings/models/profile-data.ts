export interface ProfileData {
    firstName?: string;
    lastName?: string;
    // profilePhoto?: string; // TODO: Add profile photo upload functionality
    phone?: string;
}

export interface ChangePasswordData{
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
}

