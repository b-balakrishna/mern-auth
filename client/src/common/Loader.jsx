import './loader.css';
const Loader = () => {
    return (
        <div className='loader-container'>
            <div className='dot-spinner'>
                <div className='dot-spinner__dot'></div>
                <div className='dot-spinner__dot'></div>
                <div className='dot-spinner__dot'></div>
                <div className='dot-spinner__dot'></div>
                <div className='dot-spinner__dot'></div>
                <div className='dot-spinner__dot'></div>
                <div className='dot-spinner__dot'></div>
                <div className='dot-spinner__dot'></div>
            </div>
        </div>
    );
};
export default Loader;
