import { assertEquals } from "STD/assert/assert-equals";
import { createSymmetricCryptor } from "./mod.ts";
const sample1String = "qwertyuiop";
const sample1UInt8 = new TextEncoder().encode(sample1String);
const sample2String = `Accusam lorem nisl amet feugait commodo liber et. Diam sed amet et kasd et id lorem accusam voluptua elitr eirmod et justo diam clita consequat consetetur. Odio nonumy sadipscing dolor minim voluptua gubergren dolore vulputate vero dolor at sed lorem vero stet. Accusam justo ut lorem invidunt justo invidunt lobortis nobis. Erat duo ipsum sit eirmod lorem stet dolore dolor ipsum. Ipsum consetetur sit elitr et sit eum amet dolor et ut sanctus praesent sed et sed et.

Sanctus veniam rebum eleifend magna amet est sanctus no accusam rebum in nisl ea nulla takimata at nulla. Zzril et minim lorem aliquip sea amet clita consequat gubergren et voluptua dolor sed dolore sed consequat dolores stet. No labore sed molestie stet dolore diam amet diam ut. Sed ipsum gubergren velit eos duis takimata nulla invidunt justo accusam justo. Invidunt nulla iriure clita accumsan vero voluptua dolor. Gubergren tempor dolore minim sed sed aliquam consequat eleifend eirmod clita te eu. Feugiat justo dolore dolor eum takimata diam sit iusto delenit feugiat ipsum dolore exerci et nonumy et vel elitr. Eirmod in placerat consequat dolor ea est. Eirmod dolore facilisis invidunt eirmod. Kasd diam takimata imperdiet dolor illum elitr elitr autem vel. Augue sadipscing rebum sit amet eos aliquyam praesent tempor diam nonumy feugiat dolores kasd sed dolor. Consectetuer vulputate nonumy iriure gubergren et vel consetetur dolore esse magna diam dolore delenit. Sanctus stet eirmod. Eros vulputate elitr no.

Sit minim accusam elitr vulputate adipiscing vero consectetuer sea no no consequat facilisis ipsum consetetur. Diam clita ipsum duis sea esse vel sit at erat. Et vel quod velit nonummy dolore eirmod diam erat in sit hendrerit ipsum sea consetetur duis dignissim labore feugiat. Ut stet elitr lorem aliquyam euismod clita sit. Justo vero praesent. Tation ut nonumy et nonumy sit ut euismod consetetur diam sea nonumy aliquyam ea ut ad et velit. Et tempor eirmod nostrud ipsum dolor ullamcorper sanctus rebum et duis ex dolores ipsum possim sanctus sanctus sanctus aliquyam. Lobortis mazim no at dolor gubergren no ullamcorper diam et sit. No clita invidunt et erat kasd ex velit augue sanctus et labore minim molestie sed odio amet eirmod. Iusto tincidunt vero vero eos sed stet justo invidunt adipiscing sit aliquyam nibh at aliquam.

Duo eos accumsan sit tempor vero tempor aliquip accusam no amet qui at nonumy vero nonumy ipsum euismod labore. Ullamcorper clita stet nostrud sadipscing erat diam duis diam gubergren sea sit dolore invidunt sit amet feugiat gubergren dignissim. Et eos accusam justo justo eirmod iriure autem voluptua et sit magna invidunt dolores volutpat. Ipsum et et molestie labore sadipscing vero kasd qui. Est hendrerit aliquam. Elitr nonumy no dolor ut dolore sed dolor in sadipscing. Duis vulputate consequat delenit sadipscing kasd et. Rebum no ut diam dolore ipsum diam dolores kasd et accusam diam invidunt. Imperdiet amet sea. Eirmod dolore et amet vel in sed rebum accusam sanctus dolor ea facilisis tempor accusam sit est nonumy. Ipsum voluptua tempor facilisis et delenit labore. Et consequat molestie diam erat nam accusam et diam lobortis option sea. Autem duo dolore et facilisis.

Et ut diam assum takimata. No sit nonummy dolores praesent ut vel vero consetetur amet justo ea duo. Sanctus ea dolor delenit sanctus. Tempor et sea.

Accusam dolores et eirmod erat sadipscing lorem illum erat commodo vero gubergren. Ipsum facilisis et elit nonumy amet clita nonumy duis eirmod lorem dolores aliquip in sed at. Vero eirmod duo laoreet magna duo consetetur et et takimata. Dolore dignissim erat dolore accumsan stet diam diam gubergren eirmod aliquyam accusam et accusam et nulla et stet. Illum ut quod dolor magna ut elitr elit ullamcorper duis. Erat diam sed hendrerit vero sed ut eos veniam sanctus magna. Ea lorem iriure enim ut suscipit possim labore et volutpat. Placerat qui nisl at ipsum dolor diam dolor accusam. Diam sadipscing diam gubergren vulputate dolor dolore eirmod lorem gubergren blandit duo aliquyam. Rebum consetetur invidunt takimata voluptua et no voluptua aliquyam vel. Vero ut dolores. Feugait erat et. Sanctus dolor takimata lorem et clita sea accusam labore iusto et. Esse eirmod sed facilisis kasd. Diam elitr eos diam.

Nibh et luptatum iriure praesent. Sed aliquyam aliquyam tempor suscipit diam vero diam ad stet consectetuer amet at accusam nisl feugait labore invidunt. Est diam vel nonumy magna eirmod et nonummy sed dolor sit amet duis est amet. In in dolore ipsum amet sanctus ut dolores amet euismod consetetur ea. Sed dolores facilisi illum ullamcorper erat vero diam sed dolore est eum wisi aliquyam diam clita. Eos sed voluptua diam erat magna ipsum accusam sea. Possim lorem duis. Consetetur labore autem lorem et.

Takimata sea takimata est sit kasd et est lorem nibh in est diam. Ipsum vulputate erat amet invidunt justo te ipsum eos ipsum sed dolor. Amet no et diam. Amet ut et gubergren amet ut sed accusam duis et. Iriure kasd amet amet. In dolor sit hendrerit gubergren nulla et sea autem sanctus diam eos. Magna nonummy labore delenit clita lorem vero eirmod et nonumy sadipscing et ipsum elitr vel consetetur nonumy. Praesent eum at lobortis consequat dolor ut sanctus sadipscing sit. Accusam consetetur no velit aliquam et lorem assum in illum sed sea et et aliquip sea quod amet. Dolor zzril ut et sadipscing vero ut id dolore eu veniam velit kasd. Erat lorem sit consequat feugiat tation at sed dolore dolor sea autem in sadipscing dolore sed.`;
Deno.test("String AES-CBC", { permissions: "none" }, async () => {
	const cryptor = await createSymmetricCryptor("<PassWord123456>!!");
	const encrypted = await cryptor.encrypt(sample1String);
	console.log(encrypted);
	const decrypted = await cryptor.decrypt(encrypted);
	assertEquals(decrypted, sample1String);
});
Deno.test("UInt8 AES-CBC", { permissions: "none" }, async () => {
	const cryptor = await createSymmetricCryptor("<PassWord123456>!!");
	const encrypted = await cryptor.encrypt(sample1UInt8);
	console.log(encrypted);
	const decrypted = await cryptor.decrypt(encrypted);
	assertEquals(decrypted, sample1UInt8);
});
Deno.test("String AES-CTR", { permissions: "none" }, async () => {
	const cryptor = await createSymmetricCryptor({
		algorithm: "AES-CTR",
		key: "<PassWord123456>!!"
	});
	const encrypted = await cryptor.encrypt(sample1String);
	console.log(encrypted);
	const decrypted = await cryptor.decrypt(encrypted);
	assertEquals(decrypted, sample1String);
});
Deno.test("UInt8 AES-CTR", { permissions: "none" }, async () => {
	const cryptor = await createSymmetricCryptor({
		algorithm: "AES-CTR",
		key: "<PassWord123456>!!"
	});
	const encrypted = await cryptor.encrypt(sample1UInt8);
	console.log(encrypted);
	const decrypted = await cryptor.decrypt(encrypted);
	assertEquals(decrypted, sample1UInt8);
});
Deno.test("String AES-GCM", { permissions: "none" }, async () => {
	const cryptor = await createSymmetricCryptor({
		algorithm: "AES-GCM",
		key: "<PassWord123456>!!"
	});
	const encrypted = await cryptor.encrypt(sample1String);
	console.log(encrypted);
	const decrypted = await cryptor.decrypt(encrypted);
	assertEquals(decrypted, sample1String);
});
Deno.test("UInt8 AES-GCM", { permissions: "none" }, async () => {
	const cryptor = await createSymmetricCryptor({
		algorithm: "AES-GCM",
		key: "<PassWord123456>!!"
	});
	const encrypted = await cryptor.encrypt(sample1UInt8);
	console.log(encrypted);
	const decrypted = await cryptor.decrypt(encrypted);
	assertEquals(decrypted, sample1UInt8);
});
Deno.test("String AES-CBC,AES-CTR,AES-GCM", { permissions: "none" }, async () => {
	const cryptor = await createSymmetricCryptor([
		{ algorithm: "AES-CBC", key: "<PassWord123456>!!" },
		{ algorithm: "AES-CTR", key: "<PassWord123456>!!" },
		{ algorithm: "AES-GCM", key: "<PassWord123456>!!" }
	]);
	const encrypted = await cryptor.encrypt(sample1String);
	console.log(encrypted);
	const decrypted = await cryptor.decrypt(encrypted);
	assertEquals(decrypted, sample1String);
});
Deno.test("UInt8 AES-CBC,AES-CTR,AES-GCM", { permissions: "none" }, async () => {
	const cryptor = await createSymmetricCryptor([
		{ algorithm: "AES-CBC", key: "<PassWord123456>!!" },
		{ algorithm: "AES-CTR", key: "<PassWord123456>!!" },
		{ algorithm: "AES-GCM", key: "<PassWord123456>!!" }
	]);
	const encrypted = await cryptor.encrypt(sample1UInt8);
	console.log(encrypted);
	const decrypted = await cryptor.decrypt(encrypted);
	assertEquals(decrypted, sample1UInt8);
});
Deno.test("String AES-CBC,AES-CTR,AES-GCM Large", { permissions: "none" }, async () => {
	const cryptor = await createSymmetricCryptor([
		{ algorithm: "AES-CBC", key: "<PassWord123456>!!" },
		{ algorithm: "AES-CTR", key: "<PassWord987654>!!" },
		{ algorithm: "AES-GCM", key: "<PassWord123456>!!" }
	]);
	const encrypted = await cryptor.encrypt(sample2String);
	console.log(encrypted);
	const decrypted = await cryptor.decrypt(encrypted);
	assertEquals(decrypted, sample2String);
});
Deno.test("File AES-CBC,AES-CTR,AES-GCM Large", {
	permissions: {
		read: true,
		write: true
	}
}, async () => {
	const tempfile = await Deno.makeTempFile();
	try {
		await Deno.writeTextFile(tempfile, sample2String);
		const cryptor = await createSymmetricCryptor([
			{ algorithm: "AES-CBC", key: "<PassWord123456>!!" },
			{ algorithm: "AES-CTR", key: "<PassWord987654>!!" },
			{ algorithm: "AES-GCM", key: "<PassWord123456>!!" }
		]);
		await cryptor.encryptFile(tempfile);
		await cryptor.decryptFile(tempfile);
		assertEquals(await Deno.readTextFile(tempfile), sample2String);
	} finally {
		await Deno.remove(tempfile);
	}
});
