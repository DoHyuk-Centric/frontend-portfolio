import { Code2, Lightbulb, Wrench } from "lucide-react";

import type { Project } from "@/data/projects";
import Link from "next/link";
import { ProjectImageCarousel } from "../project-image-carousel";
import { ProjectModalHeader } from "../project-modal-header";

export function GentleLionModalContent({ project }: { project: Project }) {
  return (
    <div className="flex flex-col gap-6">
      <ProjectImageCarousel
        images={[
          {
            src: "/project/gentle-lion/gentlelion-main.webp",
            alt: "GentleLion 대표 이미지 1",
          },
          {
            src: "/project/gentle-lion/gentlelion-admin.webp",
            alt: "GentleLion 대표 이미지 2",
          },
        ]}
      />

      <ProjectModalHeader project={project} />

      <div className="flex flex-col gap-2">
        <div className="flex gap-4 justify-center">
          <Link
            href="https://gentlelion.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            서비스 페이지
          </Link>
          <Link
            href="https://gentlelion-adminmin.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            관리자 페이지
          </Link>
          <Link
            href="https://github.com/FRONTENDBOOTCAMP-17th/gentlelion"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Github
          </Link>
        </div>
        <div className="flex justify-center text-muted-foreground">
          임시 계정: admin@gentlemonster.com / admin123
        </div>
      </div>

      <div className="group flex flex-col gap-2 px-4 mt-4">
        <h3 className="flex items-center gap-2 font-bold text-xl text-foreground">
          <Lightbulb className="size-6 text-blue-500 opacity-0 transition-opacity group-hover:opacity-100" />
          Mono Repo
        </h3>
        <div className="text-base text-muted-foreground px-12">
          <ul className="flex list-disc flex-col gap-3 pl-4">
            <li>
              <h4>
                npm Workspaces 모노레포로 사용자/관리자 페이지를 분리해 서비스별
                독립 배포
              </h4>
            </li>
            <li>
              <h4>물리적 분리의 보안적 이점</h4>
              <ul className="flex list-[circle] flex-col gap-2 pl-4 mt-2">
                <li>
                  사용자 페이지와 관리자 페이지를 서로 다른 워크스페이스로
                  빌드해 서로의 존재를 알 수 없도록 구현
                </li>
                <li>
                  모놀리식 구조 대비 사용자 페이지 번들에는 관리자 관련 코드가
                  포함되지 않아 소스 노출 경로 자체를 차단
                </li>
              </ul>
            </li>
            <li>
              <h4>공통 API 재사용</h4>
              <ul className="flex list-[circle] flex-col gap-2 pl-4 mt-2">
                <li>
                  분리된 두 프로젝트에서 API 호출 코드가 중복되는 문제가 발생
                </li>
                <li>
                  공통 API를 분리해 사용자/관리자 양쪽에서 재사용이 가능하도록
                  설계해 프로젝트 경량화
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <div className="group flex flex-col gap-2 px-4 my-8">
        <h3 className="flex items-center gap-2 font-bold text-xl text-foreground">
          <Code2 className="size-6 text-blue-500 opacity-0 transition-opacity group-hover:opacity-100" />
          기여
        </h3>
        <div className="px-12 text-base text-muted-foreground">
          <ul className="flex list-disc flex-col gap-3 pl-4">
            <li>
              <h4>인프라</h4>
              <ul className="flex list-[circle] flex-col gap-2 pl-4 mt-2">
                <li>모노레포 구성, Git flow 전략 수립, Vercel 배포</li>
              </ul>
            </li>
            <li>
              선글라스, 안경, 장바구니, 주문 페이지와 백오피스의 사용자 관리,
              주문 관리, 주문 상세 페이지를 담당(총 19개 페이지중 7개 페이지를
              담당)
            </li>
            <li>
              상품 구매 도메인 플로우 영역을 맡아 사용자의 주문 생성부터
              관리자의 주문 조회/상세까지 이어지는 흐름을 구현
            </li>
          </ul>
        </div>
      </div>

      <div className="group flex flex-col gap-2 px-4 my-8">
        <h3 className="flex items-center gap-2 font-bold text-xl text-foreground">
          <Wrench className="size-6 text-blue-500 opacity-0 transition-opacity group-hover:opacity-100" />
          핵심 기능
        </h3>
        <div className="px-12 text-base text-muted-foreground">
          <ul className="flex list-disc flex-col gap-3 pl-4">
            <li>
              <h4>상품 장바구니 ~ 주문 관리 API 구현</h4>
              <ul className="flex list-[circle] flex-col gap-2 pl-4 mt-2">
                <li>
                  사용자
                  <ul className="list-[square] pl-4 text-sm mt-1 flex flex-col gap-1">
                    <li>
                      장바구니 목록 조회/추가/삭제, 수량 변경 시 업데이트
                    </li>
                    <li>
                      주문 목록/상세 조회, 주문 생성
                    </li>
                  </ul>
                </li>
                <li>
                  관리자
                  <ul className="list-[square] pl-4 text-sm mt-1 flex flex-col gap-1">
                    <li>
                      주문 목록/상세 조회
                    </li>
                    <li>
                      사용자 목록 조회/삭제
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <h4>Auth(로그인/로그아웃)</h4>
              <ul className="flex list-[circle] flex-col gap-2 pl-4 mt-2">
                <li>백엔드가 로그인 응답 본문에 JWT를 담아 내려주는 방식에 맞게 localStorage 저장 인증 방식으로 구현
                  <pre className="mt-2 overflow-x-auto rounded-lg border bg-muted/50 p-4 text-xs">
                    <code>{`// POST /api/auth/login 응답
{
  "success": true,
  "data": { "userId": 1, "email": "...", ... },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}`}</code>
                  </pre>
                </li>
                <li>로그아웃시 localStorage에서 토큰을 제거하는 방식으로 구현</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
