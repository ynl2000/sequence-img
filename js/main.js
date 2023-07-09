const num = 200;
const mask = document.querySelector('aside');

// 반환된 이미지를 전역변수에 담음
const imgDOM = createImgs('figure', num);

let count = 0;

// imgDOM이 생성되자마자 바로 반복을 돌면서
// 각 img 요소에 소스이미지 로딩완료 유무를 onload이벤트로 확인
// 이후 소스이미지 로딩숫자값과 전체 이미지 개수가 동일해지면 모든 이미지소스 로딩 완료처리
imgDOM.forEach((img) => {
	img.onload = () => {
		count++;

		console.log(count);

		if (count == num) {
			console.log('이미지 소스 로딩 완료');

			mask.classList.add('off');

			// 모든 소스이미지 로드시에 마스크 이미지 제거
			setTimeout(() => {
				mask.remove();
			}, 2000);
		}
	};

	// 해당 이미지 요소에 소스이미지에 오류가 생기면 이벤트를 발생시켜 대체 이미지 출력
	img.onerror = (e) => {
		e.currentTarget.setAttribute('src', 'img/logo.png');
	};
});

// 마우스가 이동할때마다 이벤트 실행
window.addEventListener('mousemove', (e) => {
	matchMove(imgDOM, num, e);
});

// 브라우저에서 마우스 포인터를 움직일때마다 현재 포인터의 가로축 좌표값 출력
// 마우스가 움직일때마다 항상 1~200가 찍히는 200분율 변환
// 백분율 구하는 공식 (현재수치값 / 전체수치값) * 100
// 이백분을 구하는 공식 (현재수치값 / 전체수치값) * 200
// 브라우저 폭 구하는 공식 window.innerWidth , (document 화면 안쪽)

function createImgs(targetEl, num) {
	const figure = document.querySelector(targetEl);

	let tags = '';

	for (let i = 0; i < num; i++) tags += `<img src="../img/pic${i}.jpg"></img>`;

	Array(num)
		.fill()
		.forEach((_, idx) => {
			tags += `<img src="../img/pic${idx}.jpg"></img>`;
		});

	figure.innerHTML = tags;

	const imgDOM = figure.querySelectorAll('img');

	return imgDOM;
}

// 마우스 포인터 위치에 따라 이미지 순서 매칭하는 함수
function matchMove(arrEl, num, e) {
	const cal = parseInt((e.clientX / window.innerWidth) * num);
	for (const img of arrEl) img.style.visibility = 'hidden';
	imgDOM[cal].style.visibility = 'visible';
}

// DOM 객체가 생성된 직후 DOM에 수반되는 소스 자료들을 가져오기 시작
// img요소는 DOM이 생성되어야지 그 이후에 이미지 소스를 불러옴
// img.onload 이벤트를 연결하면 해당 돔에 수반되는 소스이미지가 완료되엇을때 호출
// video.onloadeddata (영상소스 호출 이벤트)
