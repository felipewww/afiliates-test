export default (props: any) => {
    if(props.cond) {
        return props.children;
    } else {
        return null
    }
}