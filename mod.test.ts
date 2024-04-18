import { assertEquals } from "STD/assert/assert_equals.ts";
import { createSymmetricCryptor } from "./mod.ts";
Deno.test("String AES-CBC", { permissions: "none" }, async () => {
	const sample = "qwertyuiop";
	const cryptor = await createSymmetricCryptor("<PassWord123456>!!");
	const encrypted = await cryptor.encrypt(sample);
	console.log(encrypted);
	const decrypted = await cryptor.decrypt(encrypted);
	assertEquals(decrypted, sample);
});
Deno.test("Typed8 AES-CBC", { permissions: "none" }, async () => {
	const sample = new TextEncoder().encode("qwertyuiop");
	const cryptor = await createSymmetricCryptor("<PassWord123456>!!");
	const encrypted = await cryptor.encrypt(sample);
	console.log(encrypted);
	const decrypted = await cryptor.decrypt(encrypted);
	assertEquals(decrypted, sample);
});
Deno.test("String AES-CTR", { permissions: "none" }, async () => {
	const sample = "qwertyuiop";
	const cryptor = await createSymmetricCryptor({
		algorithm: "AES-CTR",
		key: "<PassWord123456>!!"
	});
	const encrypted = await cryptor.encrypt(sample);
	console.log(encrypted);
	const decrypted = await cryptor.decrypt(encrypted);
	assertEquals(decrypted, sample);
});
Deno.test("Typed8 AES-CTR", { permissions: "none" }, async () => {
	const sample = new TextEncoder().encode("qwertyuiop");
	const cryptor = await createSymmetricCryptor({
		algorithm: "AES-CTR",
		key: "<PassWord123456>!!"
	});
	const encrypted = await cryptor.encrypt(sample);
	console.log(encrypted);
	const decrypted = await cryptor.decrypt(encrypted);
	assertEquals(decrypted, sample);
});
Deno.test("String AES-GCM", { permissions: "none" }, async () => {
	const sample = "qwertyuiop";
	const cryptor = await createSymmetricCryptor({
		algorithm: "AES-GCM",
		key: "<PassWord123456>!!"
	});
	const encrypted = await cryptor.encrypt(sample);
	console.log(encrypted);
	const decrypted = await cryptor.decrypt(encrypted);
	assertEquals(decrypted, sample);
});
Deno.test("Typed8 AES-GCM", { permissions: "none" }, async () => {
	const sample = new TextEncoder().encode("qwertyuiop");
	const cryptor = await createSymmetricCryptor({
		algorithm: "AES-GCM",
		key: "<PassWord123456>!!"
	});
	const encrypted = await cryptor.encrypt(sample);
	console.log(encrypted);
	const decrypted = await cryptor.decrypt(encrypted);
	assertEquals(decrypted, sample);
});
Deno.test("String AES-CBC,AES-CTR,AES-GCM", { permissions: "none" }, async () => {
	const sample = "qwertyuiop";
	const cryptor = await createSymmetricCryptor([
		{ algorithm: "AES-CBC", key: "<PassWord123456>!!" },
		{ algorithm: "AES-CTR", key: "<PassWord123456>!!" },
		{ algorithm: "AES-GCM", key: "<PassWord123456>!!" }
	]);
	const encrypted = await cryptor.encrypt(sample);
	console.log(encrypted);
	const decrypted = await cryptor.decrypt(encrypted);
	assertEquals(decrypted, sample);
});
Deno.test("Typed8 AES-CBC,AES-CTR,AES-GCM", { permissions: "none" }, async () => {
	const sample = new TextEncoder().encode("qwertyuiop");
	const cryptor = await createSymmetricCryptor([
		{ algorithm: "AES-CBC", key: "<PassWord123456>!!" },
		{ algorithm: "AES-CTR", key: "<PassWord123456>!!" },
		{ algorithm: "AES-GCM", key: "<PassWord123456>!!" }
	]);
	const encrypted = await cryptor.encrypt(sample);
	console.log(encrypted);
	const decrypted = await cryptor.decrypt(encrypted);
	assertEquals(decrypted, sample);
});
