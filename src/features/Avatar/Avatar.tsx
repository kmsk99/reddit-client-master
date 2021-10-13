const Avatar = (props: { name: string }) => {
    const { name } = props;

    return (
        <img
            src={`https://api.adorable.io/avatars/10/${name}`}
            alt={`${name} profile`}
            className="h-5 mr-2 rounded-xl"
        />
    );
};

export default Avatar;
