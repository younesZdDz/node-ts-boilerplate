import httpStatus from 'http-status';
import { DateTime } from 'luxon';
import User, { IUser } from './auth.model';
import { ApiError } from '../../../utils/ApiError';
import config from '../../../config';

async function generateTokenResponse(user: IUser) {
    const token = user.token();
    const tokenExpiresIn = DateTime.utc().plus({ seconds: config.JWT.jwtTokenLife }).toSeconds();
    // eslint-disable-next-line no-param-reassign
    user.sessions = [
        ...user.sessions,
        {
            token,
            tokenExpiresIn,
        },
    ];
    user.save();

    return { token, tokenExpiresIn };
}

export async function registerService(email: string, password: string): Promise<void> {
    const isEmailExists = await User.findOne({ email }, { _id: 0 });

    if (isEmailExists) {
        throw new ApiError({
            message: 'Email address already exists',
            status: httpStatus.CONFLICT,
        });
    }
    await new User({
        email,
        password,
    }).save();
}

export async function loginService(
    email: string,
    password: string,
): Promise<
    [
        {
            token: string;
            tokenExpiresIn: number;
        },
        IUser,
    ]
> {
    const user = await User.findOne(
        { email },
        {
            _id: 1,
            email: 1,
            sessions: 1,
            password: 1,
        },
    );
    if (!user) {
        throw new ApiError({
            message: 'Credentials did not match',
            status: httpStatus.UNAUTHORIZED,
        });
    }
    const passwordMatches = await user.passwordMatches(password);

    if (!passwordMatches) {
        throw new ApiError({
            message: 'Credentials did not match',
            status: httpStatus.UNAUTHORIZED,
        });
    }

    const token = await generateTokenResponse(user);
    return [token, user];
}

export async function logoutService(token: string): Promise<void> {
    const user = await User.findOne({
        sessions: { $elemMatch: { token } },
    });

    if (!user) {
        throw new ApiError({
            message: 'Token did not match',
            status: httpStatus.UNAUTHORIZED,
        });
    }

    await User.updateOne(
        // eslint-disable-next-line no-underscore-dangle
        { _id: user._id, 'sessions.token': token },
        { $pull: { sessions: { token } } },
    );
}
