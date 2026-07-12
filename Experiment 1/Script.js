// External JavaScript

function displayInfo() {

    console.log("Welcome! JavaScript is running.");

    // Error message example
    console.error("This is a sample error message.");

    // User Environment Information
    const userInfo = {
        Browser: navigator.userAgent,
        Language: navigator.language,
        Platform: navigator.platform,
        Online: navigator.onLine
    };

    console.table(userInfo);

    // Trace the function call
    console.trace("Trace for displayInfo()");
}
