/**
 * Create a random GUID
 *
 * @return {string}
 */
const guid = () => {
    const getFourRandomValues = () => Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    return (
        `${getFourRandomValues() +
    getFourRandomValues()
        }-${
            getFourRandomValues()
        }-${
            getFourRandomValues()
        }-${
            getFourRandomValues()
        }-${
            getFourRandomValues()
        }${getFourRandomValues()
        }${getFourRandomValues()}`
    );
};

export default guid;
