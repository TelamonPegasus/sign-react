import LoadingBar from "react-top-loading-bar";

const LoadingBarPage = ({ progress, setProgress }) => (
  <LoadingBar
    color="#d63e2f"
    height={3}
    onLoaderFinished={() => setProgress(0)}
    progress={progress}
  />
);

export default LoadingBarPage;
