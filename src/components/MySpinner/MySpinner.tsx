const MySpinner: React.FC = () => {
  console.log("MySpinner");
  return (
    <>
      <h3>Loading...</h3>
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </>
  );
};

export default MySpinner;
