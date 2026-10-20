import {
  Code2,
  Hammer,
  LayoutGrid,
  Route,
  Star,
  Store,
  Wrench,
  Lightbulb,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import type { Project } from "@/data/projects";

import { ProjectImageCarousel } from "../project-image-carousel";
import { ProjectModalHeader } from "../project-modal-header";
import {
  FeatureGrid,
  FlowSteps,
  Highlight,
  ModalSection,
  ProjectLinks,
  ServicePitch,
  StrengthList,
  type ServiceFeature,
  type ServiceStrength,
} from "../project-section";

const features: ServiceFeature[] = [
  {
    title: "메인 피드",
    description:
      "통합 검색과 히어로 배너, 지금 열린 번개모임, 카테고리별 인기 목록을 첫 화면에서 한눈에 볼 수 있습니다.",
    image: {
      src: "/project/kanto/features/main.webp",
      alt: "Kanto 메인 화면, 구인구직 배너와 통합 검색창",
      width: 1280,
      height: 720,
    },
  },
  {
    title: "구인구직",
    description:
      "필리핀 현지 한인 업체의 공고를 급여·근무 시간·마감일(D-N)과 함께 표로 비교할 수 있습니다.",
    image: {
      src: "/project/kanto/features/job.webp",
      alt: "Kanto 구인구직 목록, 회사·공고 제목·급여·근무 시간이 표로 정리된 화면",
      width: 1280,
      height: 720,
    },
  },
  {
    title: "중고거래 · 부동산",
    description:
      "카테고리와 지역으로 필터링하고, 매물 위치는 Google Maps로 확인합니다. 등록 이미지는 AI로 검수합니다.",
    image: {
      src: "/project/kanto/features/rental.webp",
      alt: "Kanto 부동산 목록, 콘도·스튜디오 매물 사진과 월세가 카드로 표시된 화면",
      width: 1280,
      height: 720,
    },
  },
  {
    title: "칸토고 (번개모임)",
    description:
      "지도에 모임 핀을 꽂아 동네 사람들과 바로 모이고, 참여하면 실시간 그룹 채팅으로 이어집니다.",
    image: {
      src: "/project/kanto/features/kantogo.webp",
      alt: "Kanto GO 지도 화면, 마닐라 곳곳의 모임 핀과 'BGC 삼겹살 번개' 상세 정보",
      width: 1280,
      height: 720,
    },
  },
  {
    title: "채팅 · 안전결제",
    description:
      "판매자와 1:1로 대화하다가 채팅 안에서 바로 안전결제를 요청하고, 결제부터 수령 확인까지 이어서 진행합니다.",
    image: {
      src: "/project/kanto/features/chat.webp",
      alt: "Kanto 채팅방, 원목 좌식 테이블 거래 중 에스크로 보관 중인 안전결제 카드와 수령 확인 버튼",
      width: 1280,
      height: 720,
    },
  },
  {
    title: "다국어",
    description:
      "한국어·영어·필리핀어를 전환할 수 있어 현지인과도 함께 거래할 수 있습니다.",
    image: {
      src: "/project/kanto/features/i18n.webp",
      alt: "Kanto 중고거래 화면이 영어(Marketplace)로 전환된 모습과 언어 선택 버튼",
      width: 1280,
      height: 720,
    },
  },
  {
    title: "관리자",
    description:
      "KPI 대시보드와 사용자·게시글·신고·결제 관리로, 신고된 게시글을 확인하고 비활성화까지 한 화면에서 처리합니다.",
    image: {
      src: "/project/kanto/features/admin.webp",
      alt: "Kanto 관리자 신고 처리 화면, 신고 내용과 처리 로그, 게시글 비활성화 옵션",
      width: 1280,
      height: 720,
    },
  },
];

const tradeFlow = [
  "1:1 채팅",
  "결제 요청",
  "에스크로 보관",
  "수령 확인",
  "정산",
  "상호 리뷰",
];

const strengths: ServiceStrength[] = [
  {
    title: "흩어진 생활 정보를 한곳에",
    description:
      "Facebook 그룹마다 흩어져 있던 중고거래·구인구직·부동산 정보를 하나의 서비스에서 찾고 관리합니다.",
  },
  {
    title: "선입금 사기를 막는 안전결제",
    description:
      "구매자가 수령을 확인하기 전까지 플랫폼이 대금을 보관해, 돈만 받고 사라지는 거래를 막습니다.",
  },
  {
    title: "믿고 거래하는 망고 지수",
    description:
      "\"당근 온도\"처럼 거래 상대의 신뢰도를 망고 지수라는 점수로 보여줘, 처음 만나는 사람과도 안심하고 거래합니다.",
  },
  {
    title: "온라인에서 오프라인으로",
    description:
      "칸토고 번개모임으로 같은 동네에 사는 한인들이 실제로 만나 교류할 수 있습니다.",
  },
];

export function KantoModalContent({ project }: { project: Project }) {
  return (
    <div className="flex flex-col gap-6">
      <ProjectImageCarousel
        images={[
          {
            kind: "video",
            src: "/project/kanto/kanto-demo.mp4",
            poster: "/project/kanto/kanto-demo-poster.webp",
            alt: "Kanto 서비스 소개 영상",
          },
          { src: "/project/kanto/KantoMain.webp", alt: "Kanto 대표 이미지 1" },
          { src: "/project/kanto/KantoLogin.webp", alt: "Kanto 대표 이미지 2" },
          { src: "/project/kanto/KantoAdmin.webp", alt: "Kanto 대표 이미지 3" },
        ]}
      />

      <ProjectModalHeader project={project} />
      <ProjectLinks
        links={[
          { label: "서비스 페이지", href: "https://kanto-pi.vercel.app" },
          { label: "관리자 페이지", href: "https://kanto-pi.vercel.app/admin" },
          {
            label: "Github",
            href: "https://github.com/FRONTENDBOOTCAMP-17th/kanto",
          },
        ]}
        note="테스트 계정: test1234@naver.com / test1234"
      />

      <ModalSection icon={Store} title="어떤 서비스인가요?">
        <ServicePitch headline="칸토 하나로 필리핀 생활 끝.">
          <p>
            Kanto는 필리핀어로 &quot;우리 동네&quot;라는 뜻으로,{" "}
            <Highlight>필리핀에 거주 중인 한인을 위한 생활 커뮤니티 플랫폼</Highlight>
            입니다. 중고거래, 구인구직, 부동산, 동네 모임까지 필리핀 생활에
            필요한 정보를 한곳에서 찾을 수 있습니다.
          </p>
          <p>
            필리핀에 사는 한국인은 약 5.3만 명이지만, 생활 정보는 대부분
            Facebook 그룹에 흩어져 있어 한눈에 보기 어렵고, 처음 보는 사람과의
            거래는 믿기 어렵습니다. Kanto는 이 두 가지 불편에서 출발했습니다.
          </p>
        </ServicePitch>
      </ModalSection>

      <ModalSection icon={LayoutGrid} title="주요 기능">
        <FeatureGrid features={features} />
      </ModalSection>

      <ModalSection icon={Route} title="안전한 거래 흐름">
        <p>
          거래는 채팅에서 시작해 채팅 안에서 끝납니다. 필리핀 현지 결제 서비스
          Xendit의 에스크로를 이용해, 물건을 받기 전까지 대금은 플랫폼이
          보관합니다.
        </p>
        <FlowSteps steps={tradeFlow} />
      </ModalSection>

      <ModalSection icon={Star} title="Kanto의 강점">
        <StrengthList strengths={strengths} />
      </ModalSection>

      <div className="group flex flex-col gap-2 px-4 mt-4">
        <h3 className="flex items-center gap-2 font-bold text-xl text-foreground">
          <Lightbulb className="size-6 text-blue-500 opacity-0 transition-opacity group-hover:opacity-100" />
          Next.js
        </h3>
        <div className="text-base text-muted-foreground px-12">
          <ul className="flex list-disc flex-col gap-3 pl-4">
            <li>
              <h4>
                파이널 프로젝트에서 주어진 주제는 Next.js를 활용한 오픈마켓
                프로젝트 제작이었습니다.
              </h4>
              <ul className="flex list-[circle] flex-col gap-2 pl-4 mt-2">
                <li>
                  SEO가 중요한 상품 상세 페이지는 SSR, 채팅처럼 실시간성이
                  중요한 곳은 CSR로 나눠 사용해야 했습니다.
                </li>
                <li>
                  App Router의 파일 기반 라우팅으로 설정 파일 없이 팀원별 라우트
                  담당을 나눌 수 있었습니다.
                </li>
                <li>
                  결제·신고·제재 같은 민감 로직은 Server Actions로 서버에
                  격리했습니다.
                </li>
                <li>
                  서버 컴포넌트 기본 페칭으로 병렬 조회를, 상호작용이 필요한
                  곳(관리자 폼 등)은 React Query로 별도 처리했습니다.
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col group gap-2 px-4 my-8">
        <h3 className="flex items-center gap-2 font-bold text-xl text-foreground">
          <Code2 className="size-6 text-blue-500 opacity-0 transition-opacity group-hover:opacity-100" />
          기여
        </h3>
        <div className="text-base text-muted-foreground px-12">
          <ul className="flex list-disc flex-col gap-3 pl-4">
            <li>
              <p>SEO 메타데이터 최적화 상세 페이지별 동적 OG 이미지 생성</p>
            </li>
            <li>
              채팅 플로우(1:1 채팅)
              <ul className="list-[square] pl-4 text-sm mt-1 flex flex-col gap-1">
                <li>
                  채팅 타입ㆍZustand 스토어 설계 ~ 실시간 메시지ㆍ읽음
                  처리ㆍ도배 방지ㆍ메시지 페이지네이션 구현
                </li>
              </ul>
            </li>
            <li>
              운영 관리 플로우(관리자)
              <ul className="list-[square] pl-4 text-sm mt-1 flex flex-col gap-1">
                <li>
                  채팅/커뮤니티에서 발생하는 문제를 추적할 수 있도록 관리자
                  감사 로그 구현
                </li>
                <li>
                  금칙어/스팸/도배 등 운영 관리 측면에서 바뀔 수 있는 부분을
                  프론트 영역에서 변경이 가능하도록 구현
                </li>
              </ul>
            </li>
            <li>
              <p>공지사항 반응형 및 플로팅 버튼 UI 제작</p>
            </li>
            <li>
              <p>
                이용약관 페이지 Notion CMS 연동을 구현하고, 반복 API 호출 문제를
                클라이언트 캐싱으로 해결
              </p>
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
            src="/project/kanto/egress-per-day.webp"
            alt="Supabase Egress per day 대시보드, Storage Egress가 하루 390MB로 급증한 구간이 표시되어 있음"
            width={1175}
            height={327}
            className="w-full rounded-lg border"
          />
          <ul className="flex list-disc flex-col gap-3 pl-4">
            <li>
              <h4>Storage Egress 390MB → 64MB (84% 절감)</h4>
              <ul className="flex list-[circle] flex-col gap-2 pl-4 mt-2">
                <li>
                  사전 대응
                  <ul className="list-[square] pl-4 text-sm mt-1 flex flex-col gap-1">
                    <li>
                      무료 플랜의 트래픽과 토큰 한도 초과 가능성에 대비해,
                      프로젝트 이전 또는 유료 플랜 전환 두 가지 대응안을 정리
                    </li>
                  </ul>
                </li>
                <li>
                  문제 발생
                  <ul className="list-[square] pl-4 text-sm mt-1 flex flex-col gap-1">
                    <li>
                      시연용 봇 계정과 목업 게시글을 대량 등록하는 과정에서,
                      사전에 예상하지 못한 Storage Egress 한도 초과 발생
                    </li>
                  </ul>
                </li>
                <li>
                  원인
                  <ul className="list-[square] pl-4 text-sm mt-1 flex flex-col gap-1">
                    <li>사진 원본을 리사이즈/압축 없이 업로드</li>
                    <li>
                      <code>loading=&quot;eager&quot;</code>가 하드코딩되어{" "}
                      <code>lazy loading</code>이 무력화
                    </li>
                    <li>
                      Storage cacheControl 미지정으로 CDN 캐시가 1시간이라
                      만료가 될때마다 원본에서 재전송
                    </li>
                  </ul>
                </li>
                <li>
                  조치
                  <ul className="list-[square] pl-4 text-sm mt-1 flex flex-col gap-1">
                    <li>
                      브라우저 canvas로 업로드 전 클라이언트에서 압축(비율 유지
                      축소 후 WebP 변환/미지원 브라우저는 JPEG 폴백/변환이 더 큰
                      경우엔 원본을 유지), 사용자가 사진을 선택하는 시점에
                      압축해 미리보기와 실제 업로드본을 일치시킴
                    </li>
                    <li>
                      <code>loading=&quot;eager&quot;</code> 제거로 lazy loading
                      복원, 첫 화면에 바로 보이는 대표 이미지에만 priority를
                      지정해 초기 로딩 속도를 유지
                    </li>
                    <li>
                      내용이 바뀌지 않는 고유 경로 이미지에만 CDN 캐시를 1년으로
                      지정(고정 경로인 아바타와 회사 로고는 제외)
                    </li>
                  </ul>
                </li>
                <li>
                  결과
                  <ul className="list-[square] pl-4 text-sm mt-1 flex flex-col gap-1">
                    <li>
                      유료 플랜 전환으로 즉시 복구 후, 동일 조건 재검증에서
                      390MB → 64MB(약 84% 감소)
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
          기능 구현
        </h3>
        <div className="text-base text-muted-foreground px-12 flex flex-col gap-4">
          <ul className="flex list-disc flex-col gap-3 pl-4">
            <li>
              <h4>플로팅 버튼 UI</h4>
              <ul className="flex list-[circle] flex-col gap-2 pl-4 mt-2">
                <li>
                  채팅
                  <ul className="list-[square] pl-4 text-sm mt-1 flex flex-col gap-1">
                    <li>Supabase Realtime을 활용해 실시간 렌더링 방식</li>
                    <li>
                      Zustand를 활용해 사용자가 현재 존재하는 채팅방 위치
                      상태관리(List/Room/group-room)
                    </li>
                    <li>
                      서버 통신간에 사용자 UX를 개선하기 위해 낙관적 업데이트를
                      적용
                    </li>
                    <li>
                      사용자가 읽음 상태를 DB 컬럼을 두 분기(user_id_1_unread,
                      user_id_2_unread)로 분리해 구현
                    </li>
                  </ul>
                </li>
                <li>
                  챗봇
                  <ul className="list-[square] pl-4 text-sm mt-1 flex flex-col gap-1">
                    <li>
                      Gemini → Groq → Cerebras 순차 폴백 구조로 LLM 장애 시에도
                      응답을 지속할 수 있도록 구현
                    </li>
                    <li>대화 기록은 LocalStorage에 세션 단위로 저장</li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
          <ul className="flex list-disc flex-col gap-3 pl-4">
            <li>
              <h4>관리자 운영관리 구현</h4>
              <ul className="flex list-[circle] flex-col gap-2 pl-4 mt-2">
                <li>
                  공지, 관리자 권한, 금칙어 & 스팸
                  <ul className="list-[square] pl-4 text-sm mt-1 flex flex-col gap-1">
                    <li>
                      TanStack Query를 활용해 캐싱처리로 서버 반복 요청 개선
                    </li>
                  </ul>
                </li>
                <li>
                  통계 & 모니터링
                  <ul className="list-[square] pl-4 text-sm mt-1 flex flex-col gap-1">
                    <li>Sentry를 활용해 오류 로그 연동</li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
          <ul className="flex list-disc flex-col gap-3 pl-4">
            <li>
              <h4>상대방의 신뢰도를 시각적으로 확인하는 망고지수 UI 구현</h4>
              <ul className="flex list-[circle] flex-col gap-2 pl-4 mt-2">
                <li>
                  망고 지수(KTS)와 인기 게시글 점수(KPPS) 설계
                  <ul className="list-[square] pl-4 text-sm mt-1 flex flex-col gap-1">
                    <li>
                      평균분포도를 목표로 AI를 통해 사용자 9개 시나리오로 검증
                    </li>
                    <li>DB 컬럼, 배치 함수, pg_cron 스케줄을 이용해 구현</li>
                  </ul>
                </li>
                <li>
                  망고 지수 UI 구현
                  <ul className="list-[square] pl-4 text-sm mt-1 flex flex-col gap-1">
                    <li>
                      산출된 점수를 등급별 색상으로 구분하고, 점수와 게이지바가
                      1.2초간 함께 차오르도록 구현
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <div className="group flex flex-col gap-2 px-4 my-16">
        <h3 className="flex items-center gap-2 font-bold text-xl text-foreground">
          <Hammer className="size-6 text-blue-500 opacity-0 transition-opacity group-hover:opacity-100" />
          리팩토링
        </h3>
        <div className="text-base text-muted-foreground px-12">
          <ul className="flex list-disc flex-col gap-3 pl-4">
            <li>
              <h4>가독성, 예측 가능성, 응집도, 결합도를 기준으로 리팩토링</h4>
              <ul className="flex list-[circle] flex-col gap-2 pl-4 mt-2">
                <li>
                  <Link
                    href="/fundamentals"
                    className="text-blue-500 hover:underline"
                  >
                    Fundamentals
                  </Link>
                  에서 상세하게 확인이 가능합니다.
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
