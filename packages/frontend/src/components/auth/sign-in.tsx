"use client";

type Props = {
    onSignIn: () => Promise<void>;
};

const SignIn = ({ onSignIn }: Props) => {
    return (
        <button
            onClick={() => onSignIn()}
            className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-500 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
            Sign In
        </button>
    );
};

export default SignIn;
