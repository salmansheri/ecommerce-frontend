import { Loader } from "./loader";

interface LoaderWrapperProps {
	isLoading: boolean;
	children: React.ReactNode;
	fallback?: React.ReactNode;
}

export const LoaderWrapper = ({
	isLoading,
	children,
	fallback,
	
}: LoaderWrapperProps) => {
	if (isLoading) {
		return <>{fallback ?? <Loader />}</>;
	}
	return <>{children}</>;
};
