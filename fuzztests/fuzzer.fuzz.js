/*
 * Copyright 2023 Code Intelligence GmbH
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const { fuzzer } = require("@jazzer.js/fuzzer");
const { FuzzedDataProvider } = require("@jazzer.js/core");

describe("fuzzer", () => {
	it.fuzz("traceStrCmp", (data) => {
		const provider = new FuzzedDataProvider(data);
		let a = provider.consumeString(10);
		let b = provider.consumeString(10);
		let op = provider.consumeString(5);
		expect(fuzzer.tracer.traceStrCmp(a, b, op, 0)).toBeDefined();
	});

	it.fuzz("use never zero policy", (data) => {
		const provider = new FuzzedDataProvider(data);
		const iterations = provider.consumeIntegralInRange(1, 1 << 8);
		for (let i = 0; i < iterations; i++) {
			fuzzer.coverageTracker.incrementCounter(0);
		}
		expect(fuzzer.coverageTracker.readCounter(0)).not.toEqual(0);
	});
});
