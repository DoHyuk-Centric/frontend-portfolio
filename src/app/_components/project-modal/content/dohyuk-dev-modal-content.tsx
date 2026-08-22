import { Hammer, Lightbulb, Wrench, GitFork } from "lucide-react";

import type { Project } from "@/data/projects";
import Image from "next/image";
import Link from "next/link";
import { ProjectImageCarousel } from "../project-image-carousel";
import { ProjectModalHeader } from "../project-modal-header";

export function DohyukDevModalContent({ project }: { project: Project }) {
  return (
    <div className="flex flex-col gap-6">
      <ProjectImageCarousel
        images={[
          {
            src: "/project/dohyuk-dev/dohyuk.dev-main.webp",
            alt: "Kanto 대표 이미지 1",
          },
          {
            src: "/project/dohyuk-dev/dohyuk.dev-create.webp",
            alt: "Kanto 대표 이미지 2",
          },
          {
            src: "/project/dohyuk-dev/dohyuk.dev-windows.webp",
            alt: "Kanto 대표 이미지 3",
          },
        ]}
      />

      <ProjectModalHeader project={project} />

      <div className="flex flex-col gap-2">
        <div className="flex gap-4 justify-center">
          <Link
            href="https://dohyuk.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            서비스 페이지
          </Link>
          <Link
            href="https://github.com/DoHyuk-Centric/myBlog"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Github
          </Link>
        </div>
      </div>

      <div className="group flex flex-col gap-2 px-4 mt-4">
        <h3 className="flex items-center gap-2 font-bold text-xl text-foreground">
          <Lightbulb className="size-6 text-blue-500 opacity-0 transition-opacity group-hover:opacity-100" />
          Marked
        </h3>
        <div className="text-base text-muted-foreground px-12">
          <ul className="flex list-disc flex-col gap-3 pl-4">
            <li>
              <h4>개발자에게 가장 친숙한 문서는 MD 문서라고 생각했습니다.</h4>
              <ul className="flex list-[circle] flex-col gap-2 pl-4 mt-2">
                <li>
                  마크다운 텍스트를 HTML로 변환해주는 JS 라이브러리를 사용
                </li>
                <li>
                  저장 구조의 단순화라는 장점
                  <ul className="list-[square] pl-4 text-sm mt-1 flex flex-col gap-1">
                    <li>
                      순수 문자열로 DB 테이블의 별도 스키마 설계 없이 텍스트로
                      사용할 수 있어 간단
                    </li>
                    <li>
                      문자열을 <code>marked.parse()</code>로 넘기면 HTML로
                      변환되어 렌더링 로직이 비교적으로 간단
                    </li>
                  </ul>
                </li>
                <li>
                  커서 좌표 계산을 직접하는 복잡함에서 오는 단점
                  <ul className="list-[square] pl-4 text-sm mt-1 flex flex-col gap-1">
                    <li>
                      글쓰기 도구를 개발할때 직접 커서 좌표를 계산해야하는
                      복잡함
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <div className="group flex flex-col gap-2 px-4 my-8">
        <h3 className="flex items-center gap-2 font-bold text-xl text-foreground">
          <GitFork className="size-6 text-blue-500 opacity-0 transition-opacity group-hover:opacity-100" />
          오픈소스 개발
        </h3>
        <div className="px-12 text-base text-muted-foreground">
          <code className="text-amber-600">markdown-block-preview</code>라는
          MD문서를 블럭단위로 렌더링해 React 라이브러리 없이 바닐라의 환경에서
          원활한 렌더링을 제공해주는 라이브러리를 개발해{" "}
          <strong className="font-semibold text-blue-500">
            약 8.2배 성능을 개선
          </strong>
          <ul className="flex list-disc flex-col gap-1 pl-4 mt-2">
            <li>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
                href="https://www.npmjs.com/package/markdown-block-preview"
              >
                npm 배포 사이트
              </Link>
            </li>
            <li>작성일자 기준 누적 다운로드 약 500회</li>
            <li>
              검증을 통해 블럭이 많아질수록 성능 개선폭이 크게 증가(10블럭 기준
              약 8배 개선, 500블럭 기준 약 101배 개선){" "}
            </li>
          </ul>
        </div>
      </div>

      <div className="group flex flex-col gap-2 px-4 my-8">
        <h3 className="flex items-center gap-2 font-bold text-xl text-foreground">
          <Wrench className="size-6 text-blue-500 opacity-0 transition-opacity group-hover:opacity-100" />
          문제 해결
        </h3>
        <div className="text-base text-muted-foreground px-12 flex flex-col gap-4">
          <Image
            src="/project/dohyuk-dev/dohyuk.dev-troubleshooting.webp"
            alt="동기 비동기함수의 문제해결 구조가 그려져있음"
            width={500}
            height={451}
            className="w-full max-w-125 rounded-lg mx-auto border"
          />
          <ul className="flex list-disc flex-col gap-3 pl-4">
            <li>
              <h4>게시글 저장 버튼 상호작용시에도 간헐적으로 저장되는 문제</h4>
              <ul className="flex list-[circle] flex-col gap-2 pl-4 mt-2">
                <li>
                  상황
                  <ul className="list-[square] pl-4 text-sm mt-1 flex flex-col gap-1">
                    <li>
                      게시글 저장 버튼을 눌러도 DB에 저장되지 않고, 데이터가
                      짧은 경우에 간헐적으로 저장되는 상황이 발생
                    </li>
                    <li>
                      게시글 저장에 실패할때 <code>Error Log</code>를 띄워
                      발생하는 문제를 확인해보려고 했으나 어떠한 로그도 찍히지
                      않음
                    </li>
                  </ul>
                </li>
                <li>
                  원인
                  <ul className="list-[square] pl-4 text-sm mt-1 flex flex-col gap-1">
                    <li>
                      DB에 간헐적으로 저장되고, 데이터가 긴 경우 저장되지 않는
                      문제를 타이밍 문제라고 직감
                    </li>
                    <li>
                      서버로 데이터를 보내 저장하는 비동기 함수의 작업을
                      기다리지 않고 동기 함수가 먼저 페이지를 이동시켜 비동기
                      함수가 일을 모두 끝내기 전에 작업이 중단된다는 것으로 추정
                    </li>
                  </ul>
                </li>
                <li>
                  해결
                  <ul className="list-[square] pl-4 text-sm mt-1 flex flex-col gap-1">
                    <li>
                      동기함수가 비동기 함수의 DB 저장이 완료될때가지 기다렸다가
                      HTML을 이동시키도록 <code>async / await</code>를 강제
                    </li>
                  </ul>
                </li>
                <li>
                  결과
                  <ul className="list-[square] pl-4 text-sm mt-1 flex flex-col gap-1">
                    <li>
                      글을 작성해도 데이터가 누락되지 않는것을 확인해 가설을
                      검증했습니다.
                    </li>
                    <li>
                      추가로 실패 시에는 사용자에게 알림을 띄우고 이동을 막도록
                      만들어 착각할 여지를 제거 했습니다.
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <div className="group flex flex-col gap-2 px-4 my-8">
        <h3 className="flex items-center gap-2 font-bold text-xl text-foreground">
          <Wrench className="size-6 text-blue-500 opacity-0 transition-opacity group-hover:opacity-100" />
          기능
        </h3>
        <div className="text-base text-muted-foreground px-12 flex flex-col gap-4">
          <ul className="flex list-disc flex-col gap-3 pl-4">
            <li>
              <h4>글쓰기 도구 모음 UI</h4>
              <ul className="flex list-[circle] flex-col gap-2 pl-4 mt-2">
                <li>
                  헤딩(H1 ~ H4) 토글 버튼
                  <ul className="list-[square] pl-4 text-sm mt-1 flex flex-col gap-1">
                    <li>커서를 추적해 가장 앞에 #을 붙임</li>
                    <li>
                      [#] 텍스트를 추적해 H1 ~ H4까지 자유롭게 변경이 가능하도록
                      구현
                    </li>
                  </ul>
                </li>
                <li>
                  굵게 / 기울임 / 취소선 토글 버튼
                  <ul className="list-[square] pl-4 text-sm mt-1 flex flex-col gap-1">
                    <li>
                      선택 영역이 있는 경우 텍스트를 [** / * / ~~]로 감싸도록
                      구현
                    </li>
                    <li>
                      선택 영역이 없는 경우 마커 쌍을 삽입한뒤에 커서를 마커
                      사이에 위치하도록 구현
                    </li>
                  </ul>
                </li>
                <li>
                  인용구 / 코드블록 버튼
                  <ul className="list-[square] pl-4 text-sm mt-1 flex flex-col gap-1">
                    <li>현재 줄 앞에 &gt;를 붙이도록 구현</li>
                    <li>선택 영역 또는 현재 줄을 [```]로 감싸도록 구현</li>
                  </ul>
                </li>
                <li>
                  링크 삽입 버튼
                  <ul className="list-[square] pl-4 text-sm mt-1 flex flex-col gap-1">
                    <li>
                      선택 영역이 있는 경우 텍스트 라벨로 사용하고 url 자리만
                      바로 편집할 수 있도록 커서를 그 위치로 이동되도록 구현
                    </li>
                    <li>
                      선택 영역이 없는 경우 텍스트 라벨에 커서를 두도록 구현
                    </li>
                  </ul>
                </li>
                <li>
                  이미지 삽입
                  <ul className="list-[square] pl-4 text-sm mt-1 flex flex-col gap-1">
                    <li>
                      초기에는 Supabase Storage에 저장해 URL값을 받아줬으나
                      게시글을 작성하지 않는 경우 고아 파일로 남는 문제가 발생
                    </li>
                    <li>
                      브라우저 미리보기에선 blob: 패턴을 활용해 URL로 대체, 파일
                      객체를 Map에 blob URL 키로 보관해두었다가 게시글 발행시에
                      Storage에 저장해 실제 URL로 원문 문자열을 치환
                    </li>
                    <li>
                      치환 완료 후 임시 미리보기 URL 메모리를 해제하도록 구현
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
          <ul className="flex list-disc flex-col gap-3 pl-4">
            <li>
              <h4>캘린더 컴포넌트 구현</h4>
              <ul className="flex list-[circle] flex-col gap-2 pl-4 mt-2">
                <li>
                  공공 데이터 API
                  <ul className="list-[square] pl-4 text-sm mt-1 flex flex-col gap-1">
                    <li>
                      <code>fetch()</code>방식으로 Supabase Edge Function 주소를
                      호출해 공휴일 데이터 요청
                    </li>
                    <li>
                      Edge Function 서버에 있는 키를 꺼내서 실제
                      공공데이터포털에 요청을 보냄
                    </li>
                    <li>
                      공공데이터포털 API는 데이터가 1개뿐이면 낱개 객체로, 여러
                      개면 배열로 응답 형태가 달라지는 특징이 있었습니다. 이를
                      그대로 순회 로직에 넘기면 낱개로 온 경우 에러가 나기
                      때문에, <code>Array.isArray</code>로 형태를 먼저 확인해 낱개일 땐
                      배열로 감싸주는 정규화 처리를 추가했습니다.
                    </li>
                  </ul>
                </li>
                <li>
                  날짜 계산
                  <ul className="list-[square] pl-4 text-sm mt-1 flex flex-col gap-1">
                    <li>
                      <code>Date</code>를 활용해 다음달의 0일은 이번달의 마지막
                      날짜로 간주
                    </li>
                    <li>
                      마지막 날짜 기준으로 빈 영역이 있는 경우 다음달의 날짜로
                      빈 그리드 영역을 채움
                    </li>
                  </ul>
                </li>
                <li>
                  날짜별 색상 변경
                  <ul className="list-[square] pl-4 text-sm mt-1 flex flex-col gap-1">
                    <li>
                      일주일인 7일을 기준으로 주마다 첫칸은 빨간색과 마지막칸은
                      파란색을 칠하도록 구현
                    </li>
                    <li>
                      저번 달과 다음 달의 날짜 색상은 보다 흐릿한 색상으로 표현
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
