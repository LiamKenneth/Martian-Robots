import { testfunction } from "../src/main";

describe('test', () => {
        it('should return Hello, World!', () => {
    
        expect(testfunction()).toBe("Hello, World!");
    });
  
});