export const Dashboard = () => {

    const user = JSON.parse(sessionStorage.getItem('user'));

    return (
        <>
            <h3>Bienvenido {user}</h3>

            <p>Recuerda que puedes realizar tus consultas también desde la app</p>
        </>
    )
}
