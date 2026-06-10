module.exports = {
    testDir: ".",
    timeout: 30000,
    reporter: "html",
    use: {
        baseURL: "http://localhost:5500",
        browserName: "chromium"
    }
};