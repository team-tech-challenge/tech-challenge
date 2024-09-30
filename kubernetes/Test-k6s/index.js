import http from 'k6/http';
import { sleep, check, fail, group } from 'k6';
import { Trend, Rate, Counter } from 'k6/metrics';

export let options = {
	stages: [
		{ duration: '1m', target: 150 },
		{ duration: '3m', target: 0 },
	],
};

export let Duration = new Trend('Duration');
export let Failure = new Rate('Failure');
export let SuccessRequest = new Rate('SuccessRequest');
export let RequestNumber = new Counter('RequestNumber');

export default function () {
	group('CreateOrder', () => {
		let payload = JSON.stringify({
			fk_idCustomer: 1,
			status: "Created",
			price: "19.90"
		});

		let params = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		let res = http.post('http://localhost:3000/order/create', payload, params);

		Duration.add(res.timings.duration);
		RequestNumber.add(1);
		Failure.add(res.status === 0 || res.status >= 400);
		SuccessRequest.add(res.status < 400);

		let durationMsg = `Max duration: ${(4000 / 1000)}s`;

		let checkResult = check(res, {
			'max duration': (r) => r.timings.duration < 4000,
		});

		if (!checkResult) {
			fail(durationMsg);
		}
	});
	sleep(1);
}
