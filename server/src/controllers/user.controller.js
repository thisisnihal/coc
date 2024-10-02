const hello = async (req, res) => {
    console.log("hello")
    return res.status(200).json({msg: "hello"});
}

export {hello};