const Slide = ({ title, description, bgImg, url }) => {
  return (
    <>
      <div
        className={`relative w-[100%] h-[50vh] md:h-[70vh] bg-cover bg-center bg-no-repeat`}
        style={{ backgroundImage: `${bgImg}` }}
      >
          <a className="block">
            <div
              className="backdrop-filter backdrop-blur-[12px] bg-white/50 p-3 md:p-8 lg:p-10 shadow-lg md:overflow-hidden rounded-md md:w-[60%] lg:w-[50%] md:mt-auto absolute bottom-0 md:top-[45%] md:right-[25%] md:bottom-auto"
            >
              <h3 className="text-lg md:text-2xl lg:text-3xl font-medium">
                {[`${title}`]}
              </h3>
              <p className="text-[13px] md:text-lg mt-2 md:mt-4 lg:mt-8">
                {[`${description}`]}
              </p>
            </div>
          </a>
      </div>
    </>
  );
};

export default Slide;