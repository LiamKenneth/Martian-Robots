describe("main integration", () => {
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    // Intercept console.log so we can verify the output and prevent it from printing during tests
    consoleSpy = jest.spyOn(console, "log").mockImplementation();
  });

  afterEach(() => {
    // Restore console.log
    consoleSpy.mockRestore();
    // Reset modules so that requiring main.ts actually executes it again if we add more tests
    jest.resetModules();
  });

  it("should process the hardcoded input and log the correct final coordinates", async () => {
    // Importing the file causes it to execute the main() function immediately
    await import("../src/main");

    // The script should call console.log 3 times with the exact expected output
    expect(consoleSpy).toHaveBeenCalledTimes(3);
    expect(consoleSpy).toHaveBeenNthCalledWith(1, "1 1 E");
    expect(consoleSpy).toHaveBeenNthCalledWith(2, "3 3 N LOST");
    expect(consoleSpy).toHaveBeenNthCalledWith(3, "2 3 S");
  });
});
