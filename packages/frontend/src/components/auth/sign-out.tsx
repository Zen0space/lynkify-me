"use client";

type Props = {
    onSignOut: () => Promise<void>;
};

const SignOut = ({ onSignOut }: Props) => {
    return (
        <button
            onClick={() => onSignOut()}
            className="rounded-lg border border-gray-600 px-6 py-3 text-sm font-semibold text-gray-300 shadow-sm transition-all hover:bg-gray-800 hover:text-white hover:shadow-md"
        >
            Sign Out
        </button>
    );
};

export default SignOut;
