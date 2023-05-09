import styles from './ProductCheckoutInputField.module.scss';

export default function ProductCheckoutInputField(props: any) {
  const { title, expanded } = props;

  const componentStyle = expanded ? styles.field : styles.field;
  return (
    <form
      // onMouseEnter={mouseEnterHandler}
      // onMouseLeave={mouseLeaveHandler}
      // style={
      //   themeCtx.isDarkTheme
      //     ? { backgroundColor: themeCtx.search.dark.backgroundColor }
      //     : {
      //         backgroundColor: themeCtx.search.light.backgroundColor,
      //       }
      // }
      className={componentStyle}
      // onSubmit={inputCtx.searchInputSubmit}
      // onMouseEnter={userStartedInteracting}
      // onMouseLeave={userStoppedInteracting}
    >
      {/* <img
        id="search__input__icon__unfocused"
        className="search__input__icon search__input__icon__unfocused"
        style={
          themeCtx.isDarkTheme
            ? { filter: 'invert(100%)' }
            : {
                filter: 'invert(0%)',
              }
        }
        src={SearchIcon}
      /> */}
      <input
        // autoFocus
        id="search__input"
        className={styles.field_input}
        // style={
        //   themeCtx.isDarkTheme
        //     ? {
        //         backgroundColor: themeCtx.search.dark.inputBackgroundColor,
        //         color: themeCtx.search.dark.color,
        //         // filter: 'invert(100%)',
        //       }
        //     : {
        //         backgroundColor: themeCtx.search.light.inputBackgroundColor,
        //         color: themeCtx.search.light.color,
        //         // filter: 'invert(0%)',
        //       }
        // }
        type="text"
        // value={inputCtx.searchText}
        // onChange={searchInputChangeHandler}
        // onMouseEnter={userStartedInteracting}
        // onMouseLeave={userStartedInteracting}
        // onBlur={searchInputBlurHandler}
        // placeholder={navCtx.placeholder}
        // spellCheck="false"
      />
      {/* {clearIcon && (
        <img
          id="search__input__icon__focused"
          className="search__input__icon search__input__icon__clearText"
          style={
            themeCtx.isDarkTheme
              ? { filter: 'invert(100%)' }
              : {
                  filter: 'invert(0%)',
                }
          }
          src={clearTextIcon}
          onClick={searchClearTextHandler}
        />
      )} */}
    </form>
  );
}
