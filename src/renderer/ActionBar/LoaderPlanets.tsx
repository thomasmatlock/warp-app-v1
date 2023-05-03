import './LoaderPlanets.scss';

const LoaderPlanets = () => {
  return (
    <>
      <div className="game-loader">
        {/* //-<div className='game-loader__background'> */}
        <div className="game-loader__planet">
          <div className="loader-radius1" />
          <div className="loader-radius2" />
          <div className="loader-radius3" />
          <div className="loader-radius4" />
          <div className="loader-mini1" />
          <div className="loader-mini2" />
          <div className="loader-mini3" />
          <div className="loader-mini4" />
          {/* <svg
          width="512px"
          height="512px"
          viewBox="0 0 512 512"
          version="1.1"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <path d="M0 0L512 0L512 512L0 512L0 0Z" id="path_1" />
            <clipPath id="mask_1">
              <use xlink:href="#path_1" />
            </clipPath>
          </defs>
          <g id="left-arrow">
            <path
              d="M0 0L512 0L512 512L0 512L0 0Z"
              id="Background"
              fill="#FFFFFF"
              fill-opacity="0"
              fill-rule="evenodd"
              stroke="none"
            />
            <g clip-path="url(#mask_1)">
              <path
                d="M185.752 256L416 256C421.891 256 426.667 260.776 426.667 266.667C426.667 272.558 421.891 277.333 416 277.333L185.752 277.333L252.876 344.458C257.041 348.623 257.041 355.377 252.876 359.542C248.71 363.708 241.956 363.708 237.791 359.542L152.458 274.209C148.292 270.044 148.292 263.29 152.458 259.124L237.791 173.791C241.956 169.625 248.71 169.625 252.876 173.791C257.041 177.956 257.041 184.71 252.876 188.876L185.752 256ZM85.3333 117.333C85.3333 111.442 90.109 106.667 96 106.667C101.891 106.667 106.667 111.442 106.667 117.333L106.667 416C106.667 421.891 101.891 426.667 96 426.667C90.109 426.667 85.3333 421.891 85.3333 416L85.3333 117.333Z"
                id="Shape"
                fill="#1A1A1A"
                fill-rule="evenodd"
                stroke="none"
              />
            </g>
          </g>
        </svg> */}
          {/* <svg
          className=".loader-planet__svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid"
        //    defs = {
        // filter#goo
          fegaussianblur(in='SourceGraphic', stddeviation='15', result='blur')
        //   fecolormatrix(in='blur', mode='matrix', values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 26 -7', result='goo')
        //   feblend(in='SourceGraphic', in2='goo') }
        /> */}
          {/* svg(xmlns='http://www.w3.org/2000/svg', version='1.1')
      defs
        filter#goo
          fegaussianblur(in='SourceGraphic', stddeviation='15', result='blur')
          fecolormatrix(in='blur', mode='matrix', values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 26 -7', result='goo')
          feblend(in='SourceGraphic', in2='goo') */}
        </div>
      </div>
    </>
  );
};
export default LoaderPlanets;
