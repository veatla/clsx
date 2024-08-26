import { clsx } from "../src";

describe("simple primitives tests:", () => {
    it("string: It should return string itself", () => {
        const string = "test";
        expect(clsx(string)).toBe(string);
    });

    it("number: It should transfer number to string", () => {
        const number = 123;
        expect(clsx(number)).toBe(number.toString());
    });

    it("bigint: It should transfer bigint to string", () => {
        const number = BigInt(9007199254740991);
        expect(clsx(number)).toBe(number.toString());
    });

    it("boolean: false It should return empty string", () => {
        const bool = false;
        expect(clsx(bool)).toBe("");
    });

    it("boolean: true It should return empty string", () => {
        const bool = true;
        expect(clsx(bool)).toBe("");
    });

    it("undefined: It should return empty string", () => {
        const bool = undefined;
        expect(clsx(bool)).toBe("");
    });

    it("null: It should return empty string", () => {
        const bool = undefined;
        expect(clsx(bool)).toBe("");
    });

    it("symbol: It should return symbols value", () => {
        const symbol = Symbol("example");
        expect(clsx(symbol)).toBe(symbol.toString());
    });
});

describe("object tests:", () => {
    it("empty object: It should return empty string", () => {
        const obj = {};
        expect(clsx(obj)).toBe("");
    });

    it("object with falsy value: It should return empty string", () => {
        const obj = {
            key: false,
        };
        expect(clsx(obj)).toBe("");
    });
    it("object with truthy value: It should return `key` string", () => {
        const obj = {
            key: true,
        };
        expect(clsx(obj)).toBe(Object.keys(obj)[0]);
    });
    it("object with multiple truthy values: It should return keys string", () => {
        const obj = {
            key: true,
            value: "hello",
        };
        expect(clsx(obj)).toBe(Object.keys(obj).join(" "));
    });
    it("object with fn in value: It should return keys string", () => {
        const obj = {
            key: true,
            value: () => true,
        };
        expect(clsx(obj)).toBe(Object.keys(obj).join(" "));
    });
});

describe("array tests:", () => {
    it("empty arr: It should return empty string", () => {
        const obj = [] as never[];
        expect(clsx(obj)).toBe("");
    });

    it("arr with single value: It should return string", () => {
        const arr = ["test"];
        expect(clsx(arr)).toBe(arr[0]);
    });
    it("arr with truthy value: It should return `key` string", () => {
        const arr = ["example", "test"];
        expect(clsx(arr)).toBe(arr.join(" "));
    });
    it("arr with object: It should return keys string", () => {
        const arr = [
            {
                key: true,
                value: "hello",
            },
        ];
        expect(clsx(arr)).toBe(arr.map((v) => Object.keys(v).join(" "))[0]);
    });

    it("arr with fn in value: It should return keys string", () => {
        const arr = [
            {
                key: true,
                // in obj value uses as condition
                value: () => true,
            },
            () => "string",
        ];
        expect(clsx(arr)).toBe(
            arr
                .map((v) =>
                    typeof v == "function" ? v() : Object.keys(v).join(" ")
                )
                .join(" ")
        );
    });
});
