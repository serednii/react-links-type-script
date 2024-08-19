const MySpinner: React.FC = () => {
  return (
    <>
      <h1>Loading...</h1>
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </>
  );
};

export default MySpinner;
