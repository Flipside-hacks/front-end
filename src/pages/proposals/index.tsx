import React, { useState } from "react";
import Layout from "@/components/common/Layout";
import Link from "next/link";

const Proposals = () => {
  const proposals = [
    {
      title: "Change the dynamics of the whole site",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
      status: "Expired",
      votes: 0,
      startTime: "2021-09-01",
      endTime: "2021-09-01",
      proposer: "0x1234567890123456789012345678901234567890",
      votesFor: 0,
      votesAgainst: 0,
      votesAbstain: 0,
      votesTotal: 0,
      votesQuorum: 0,
      votesQuorumReached: false,
      id: 1,
    },
    {
      title: "Proposal 1",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
      status: "Closed",
      votes: 0,
      startTime: "2021-09-01",
      endTime: "2021-09-01",
      proposer: "0x1234567890123456789012345678901234567890",
      votesFor: 0,
      votesAgainst: 0,
      votesAbstain: 0,
      votesTotal: 0,
      votesQuorum: 0,
      votesQuorumReached: false,
      id: 1,
    },
    {
      title: "Change the dynamics of the whole site",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
      status: "Expired",
      votes: 0,
      startTime: "2021-09-01",
      endTime: "2021-09-01",
      proposer: "0x1234567890123456789012345678901234567890",
      votesFor: 0,
      votesAgainst: 0,
      votesAbstain: 0,
      votesTotal: 0,
      votesQuorum: 0,
      votesQuorumReached: false,
      id: 1,
    },
    {
      title: "Proposal 1",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
      status: "Open",
      votes: 0,
      startTime: "2021-09-01",
      endTime: "2021-09-01",
      proposer: "0x1234567890123456789012345678901234567890",
      votesFor: 0,
      votesAgainst: 0,
      votesAbstain: 0,
      votesTotal: 0,
      votesQuorum: 0,
      votesQuorumReached: false,
      id: 1,
    },
  ];

  const [allProposals, setAllProposals] = useState(proposals);
  const [filteredProposals, setFilteredProposals] = useState(proposals);
  const [currentStatus, setCurrentStatus] = useState("All");

  const state = ["All", "Expired", "Open", "Closed"];

  const handleStatusChange = (status: string) => {
    setCurrentStatus(status);
    if (status === "All") {
      setFilteredProposals(allProposals);
    } else {
      const filteredProposals = allProposals.filter(
        (proposal) => proposal.status.toLowerCase() === status.toLowerCase()
      );
      setFilteredProposals(filteredProposals);
    }
  };
  return (
    <Layout>
      <div className="flex flex-col items-start w-full min-h-screen max-w-7xl mx-auto">
        <h1 className="text-3xl lg:text-5xl font-semibold text-center text-lime">
          Proposals
        </h1>
        <p className="lg:text-lg py-2 text-center text-[#8E8F94]">
          Proposals are suggestions submitted by members of DAOvation. You can
          vote for, against or abstain.
        </p>

        <div className="flex overflow-x-scroll mt-4 py-8">
          {state.map((category, index) => (
            <button
              key={index}
              className={`${
                currentStatus === category
                  ? "bg-lime text-black"
                  : "text-[#8E8F94]"
              } px-6 lg:px-20 py-3 font-semibold text-sm mr-4`}
              onClick={() => handleStatusChange(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="w-full mt-4 flex flex-col gap-6">
          {filteredProposals.map((proposal, index) => (
            <ProposalCard
              key={index}
              title={proposal.title}
              status={proposal.status}
              proposer={proposal.proposer}
              endTime={proposal.endTime}
              id={proposal.id}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Proposals;


type ProposalCardProps = {
    title: string;
    status: string;
    proposer: string;
    endTime: string;
    id: number;
    };

const ProposalCard = ({ title, status, proposer, endTime, id }: ProposalCardProps) => {
  return (
    <Link
      href={`proposal/${id}`}
      className="cursor-pointer trans transform hover:scale-105 flex flex-col items-start justify-between w-full h-full p-6 border border-[#333B56] rounded-lg shadow-lg"
    >
      <div className="flex flex-col items-start justify-between w-full h-full gap-8">
        <div className="flex items-center justify-between w-full">
          <div>
            <h1 className="text-xl font-semibold text-lime">{title}</h1>
            <p className="text-sm font-semibold text-[#8E8F94]">
              Ends {endTime}
            </p>
          </div>
          <p
            className={`
                        text-lg font-semibold text-[#8E8F94]
                        ${status === "Open" ? "text-lime" : ""}
                        ${status === "Expired" ? "text-red-500" : ""}
                        ${status === "Closed" ? "text-orange-500" : ""}
                        `}
          >
            {status}
          </p>
        </div>

        <div className="flex items-center justify-between w-full mt-4">
          <div className="flex items-center gap-2">
            <button
              className={`
                          px-8 py-3 font-semibold text-sm
                            ${status === "Open" ? "bg-lime text-black" : ""}
                            ${
                              status === "Expired"
                                ? "border border-red-500 text-[#8E8F94]"
                                : ""
                            }
                            ${
                              status === "Closed"
                                ? "border border-orange-500 text-[#8E8F94]"
                                : ""
                            }
                          `}
            >
              {status === "Open" ? "Vote" : ""}
              {status === "Expired" ? "Expired" : ""}
              {status === "Closed" ? "Closed" : ""}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};
