import { Nav } from "@/components/Nav";

const GITHUB_REPO = "alexanderfrey/tailbus";

export const metadata = {
  title: "Getting Started — tailbus",
  description:
    "Install tailbus, register your first agent, and connect it to Claude or Cursor in under five minutes.",
};

function Terminal({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="terminal">
      <div className="terminal-header">
        <div className="terminal-dot bg-[#ff5f57]" />
        <div className="terminal-dot bg-[#febc2e]" />
        <div className="terminal-dot bg-[#28c840]" />
        {title && (
          <span className="text-gray-400 text-xs ml-2">{title}</span>
        )}
      </div>
      <div className="terminal-body">{children}</div>
    </div>
  );
}

function Step({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <div className="flex items-center gap-3 mb-6">
        <span className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-bold flex items-center justify-center shrink-0">
          {number}
        </span>
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      <div className="ml-11">{children}</div>
    </div>
  );
}

export default function GettingStartedPage() {
  return (
    <>
      <Nav />

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Getting Started
          </h1>
          <p className="text-gray-400 text-lg mb-20">
            Install tailbus, register your first agent, and make it reachable
            from anywhere — in under five minutes.
          </p>

          <div className="flex flex-col gap-20">
            {/* Step 1: Install */}
            <Step number="1" title="Install tailbus">
              <p className="text-gray-400 mb-6 leading-relaxed">
                Run the install script. It downloads two binaries —{" "}
                <code className="text-gray-300 bg-gray-800 px-1.5 py-0.5 rounded text-sm">
                  tailbusd
                </code>{" "}
                (the daemon) and{" "}
                <code className="text-gray-300 bg-gray-800 px-1.5 py-0.5 rounded text-sm">
                  tailbus
                </code>{" "}
                (the CLI) — and places them in{" "}
                <code className="text-gray-300 bg-gray-800 px-1.5 py-0.5 rounded text-sm">
                  ~/.local/bin
                </code>
                .
              </p>
              <Terminal>
                <div className="text-sm leading-loose">
                  <span className="text-green-400">$</span>{" "}
                  <span className="text-gray-200">
                    curl -sSL https://tailbus.co/install | sh
                  </span>
                  <br />
                  <span className="text-gray-500">
                    Downloading tailbus v0.1.0 for darwin/arm64...
                  </span>
                  <br />
                  <span className="text-gray-500">
                    Installing to ~/.local/bin...
                  </span>
                  <br />
                  <span className="text-green-400">
                    tailbus v0.1.0 installed!
                  </span>
                </div>
              </Terminal>
              <p className="text-sm text-gray-500 mt-4">
                Works on Linux (amd64, arm64) and macOS (Apple Silicon, Intel).
                No dependencies.
              </p>
            </Step>

            {/* Step 2: Start the daemon */}
            <Step number="2" title="Start the daemon">
              <p className="text-gray-400 mb-6 leading-relaxed">
                Run{" "}
                <code className="text-gray-300 bg-gray-800 px-1.5 py-0.5 rounded text-sm">
                  tailbusd
                </code>{" "}
                to start the daemon. It will prompt you to log in with Google.
                Once authenticated, your machine joins the mesh and can
                discover other nodes on your account.
              </p>
              <Terminal>
                <div className="text-sm leading-loose">
                  <span className="text-green-400">$</span>{" "}
                  <span className="text-gray-200">tailbusd</span>
                  <br />
                  <span className="text-gray-500">
                    Open https://coord.tailbus.co/oauth/verify
                  </span>
                  <br />
                  <span className="text-gray-500">Enter code: </span>
                  <span className="text-yellow-300">ABCD-EFGH</span>
                  <br />
                  <br />
                  <span className="text-green-400">
                    Connected as you@company.com
                  </span>
                  <br />
                  <span className="text-gray-500">
                    MCP gateway listening on :1423
                  </span>
                  <br />
                  <span className="text-gray-500">
                    Agent socket at /tmp/tailbusd.sock
                  </span>
                </div>
              </Terminal>
              <p className="text-sm text-gray-500 mt-4">
                The daemon runs in the foreground. It opens a Unix socket for
                local agents and an MCP gateway on port 1423.
              </p>
            </Step>

            {/* Step 3: Install the Python SDK */}
            <Step number="3" title="Install the Python SDK">
              <p className="text-gray-400 mb-6 leading-relaxed">
                The Python SDK talks to the local daemon over a Unix socket.
                No network config needed — if{" "}
                <code className="text-gray-300 bg-gray-800 px-1.5 py-0.5 rounded text-sm">
                  tailbusd
                </code>{" "}
                is running, the SDK connects automatically.
              </p>
              <Terminal>
                <div className="text-sm leading-loose">
                  <span className="text-green-400">$</span>{" "}
                  <span className="text-gray-200">pip install tailbus</span>
                </div>
              </Terminal>
            </Step>

            {/* Step 4: Write your first agent */}
            <Step number="4" title="Write your first agent">
              <p className="text-gray-400 mb-6 leading-relaxed">
                An agent is any process that registers a handle and listens
                for messages. Here&apos;s a minimal example — a finance agent
                that responds to budget queries.
              </p>
              <Terminal title="finance.py">
                <pre className="text-sm leading-relaxed">
                  <span className="text-violet-400">from</span>{" "}
                  <span className="text-green-400">tailbus</span>{" "}
                  <span className="text-violet-400">import</span>{" "}
                  <span className="text-gray-200">
                    AsyncAgent, Manifest, CommandSpec
                  </span>
                  {"\n\n"}
                  <span className="text-gray-200">agent</span>{" "}
                  <span className="text-gray-500">=</span>{" "}
                  <span className="text-green-400">AsyncAgent</span>
                  <span className="text-gray-400">(</span>
                  <span className="text-amber-300">&quot;finance&quot;</span>
                  <span className="text-gray-400">,</span>
                  {"\n  "}
                  <span className="text-gray-400">manifest=</span>
                  <span className="text-green-400">Manifest</span>
                  <span className="text-gray-400">(</span>
                  {"\n    "}
                  <span className="text-gray-400">description=</span>
                  <span className="text-amber-300">
                    &quot;Budget and spend queries&quot;
                  </span>
                  <span className="text-gray-400">,</span>
                  {"\n    "}
                  <span className="text-gray-400">commands=[</span>
                  {"\n      "}
                  <span className="text-green-400">CommandSpec</span>
                  <span className="text-gray-400">(</span>
                  <span className="text-amber-300">&quot;budget&quot;</span>
                  <span className="text-gray-400">,</span>{" "}
                  <span className="text-amber-300">
                    &quot;Check remaining budget&quot;
                  </span>
                  <span className="text-gray-400">),</span>
                  {"\n    "}
                  <span className="text-gray-400">],</span>
                  {"\n  "}
                  <span className="text-gray-400">)</span>
                  {"\n"}
                  <span className="text-gray-400">)</span>
                  {"\n\n"}
                  <span className="text-violet-400">@</span>
                  <span className="text-green-400">agent.on_message</span>
                  {"\n"}
                  <span className="text-violet-400">async def</span>{" "}
                  <span className="text-blue-400">handle</span>
                  <span className="text-gray-400">(msg):</span>
                  {"\n  "}
                  <span className="text-violet-400">await</span>{" "}
                  <span className="text-gray-200">agent.</span>
                  <span className="text-blue-400">resolve</span>
                  <span className="text-gray-400">(</span>
                  {"\n    "}
                  <span className="text-gray-200">msg.session</span>
                  <span className="text-gray-400">,</span>
                  {"\n    "}
                  <span className="text-amber-300">
                    &quot;Q3 marketing budget: $48,200 remaining&quot;
                  </span>
                  {"\n  "}
                  <span className="text-gray-400">)</span>
                  {"\n\n"}
                  <span className="text-violet-400">await</span>{" "}
                  <span className="text-gray-200">agent.</span>
                  <span className="text-blue-400">run_forever</span>
                  <span className="text-gray-400">()</span>
                </pre>
              </Terminal>
              <div className="mt-6 p-4 rounded-xl bg-gray-900/50 border border-gray-800/50">
                <h3 className="text-sm font-medium text-gray-300 mb-2">
                  What happens here
                </h3>
                <ul className="text-sm text-gray-400 space-y-2 leading-relaxed">
                  <li>
                    <code className="text-gray-300 bg-gray-800 px-1 py-0.5 rounded text-xs">
                      AsyncAgent(&quot;finance&quot;)
                    </code>{" "}
                    — connects to the local daemon via Unix socket and registers
                    the handle <strong className="text-gray-300">finance</strong>
                  </li>
                  <li>
                    <code className="text-gray-300 bg-gray-800 px-1 py-0.5 rounded text-xs">
                      Manifest
                    </code>{" "}
                    — declares what this agent does. Commands become MCP tools
                    that Claude and Cursor can call.
                  </li>
                  <li>
                    <code className="text-gray-300 bg-gray-800 px-1 py-0.5 rounded text-xs">
                      @agent.on_message
                    </code>{" "}
                    — called whenever another agent (or an MCP client) opens a
                    session to this handle
                  </li>
                  <li>
                    <code className="text-gray-300 bg-gray-800 px-1 py-0.5 rounded text-xs">
                      agent.resolve()
                    </code>{" "}
                    — sends the response and closes the session
                  </li>
                </ul>
              </div>
            </Step>

            {/* Step 5: Run it */}
            <Step number="5" title="Run it">
              <p className="text-gray-400 mb-6 leading-relaxed">
                Start your agent. It registers with the daemon and is
                immediately discoverable by every other agent on your mesh.
              </p>
              <Terminal>
                <div className="text-sm leading-loose">
                  <span className="text-green-400">$</span>{" "}
                  <span className="text-gray-200">python finance.py</span>
                </div>
              </Terminal>
              <p className="text-gray-400 mt-6 mb-6 leading-relaxed">
                Verify it&apos;s registered using the CLI:
              </p>
              <Terminal>
                <div className="text-sm leading-loose">
                  <span className="text-green-400">$</span>{" "}
                  <span className="text-gray-200">tailbus list</span>
                  <br />
                  <span className="text-gray-300">{"  "}finance</span>
                  <span className="text-gray-600">
                    {"    "}Budget and spend queries
                  </span>
                </div>
              </Terminal>
            </Step>

            {/* Step 6: Talk to it from another agent */}
            <Step number="6" title="Talk to it from another agent">
              <p className="text-gray-400 mb-6 leading-relaxed">
                On the same machine — or any other machine on your mesh —
                write a second agent that opens a session to{" "}
                <code className="text-gray-300 bg-gray-800 px-1.5 py-0.5 rounded text-sm">
                  finance
                </code>
                .
              </p>
              <Terminal title="strategy.py">
                <pre className="text-sm leading-relaxed">
                  <span className="text-violet-400">from</span>{" "}
                  <span className="text-green-400">tailbus</span>{" "}
                  <span className="text-violet-400">import</span>{" "}
                  <span className="text-gray-200">AsyncAgent</span>
                  {"\n\n"}
                  <span className="text-gray-200">agent</span>{" "}
                  <span className="text-gray-500">=</span>{" "}
                  <span className="text-green-400">AsyncAgent</span>
                  <span className="text-gray-400">(</span>
                  <span className="text-amber-300">&quot;strategy&quot;</span>
                  <span className="text-gray-400">)</span>
                  {"\n\n"}
                  <span className="text-gray-500">
                    # Open a session to finance — wherever it is
                  </span>
                  {"\n"}
                  <span className="text-gray-200">response</span>{" "}
                  <span className="text-gray-500">=</span>{" "}
                  <span className="text-violet-400">await</span>{" "}
                  <span className="text-gray-200">agent.</span>
                  <span className="text-blue-400">open_session</span>
                  <span className="text-gray-400">(</span>
                  {"\n  "}
                  <span className="text-amber-300">&quot;finance&quot;</span>
                  <span className="text-gray-400">,</span>
                  {"\n  "}
                  <span className="text-amber-300">
                    &quot;What&#39;s the Q3 marketing budget?&quot;
                  </span>
                  {"\n"}
                  <span className="text-gray-400">)</span>
                  {"\n\n"}
                  <span className="text-blue-400">print</span>
                  <span className="text-gray-400">(</span>
                  <span className="text-gray-200">response.payload</span>
                  <span className="text-gray-400">)</span>
                  {"\n"}
                  <span className="text-gray-500">
                    # → &quot;Q3 marketing budget: $48,200 remaining&quot;
                  </span>
                </pre>
              </Terminal>
              <p className="text-sm text-gray-500 mt-4">
                The daemon resolves the handle, opens a peer-to-peer gRPC
                connection (with mTLS), and delivers the message. If the
                agents are on different machines behind NATs, it handles
                traversal automatically.
              </p>
            </Step>

            {/* Step 7: Use it from Claude or Cursor */}
            <Step number="7" title="Use it from Claude or Cursor">
              <p className="text-gray-400 mb-6 leading-relaxed">
                The daemon&apos;s MCP gateway exposes every registered handle
                as a tool. Add a single line to your MCP config:
              </p>
              <Terminal title="mcp-config.json">
                <pre className="text-sm leading-relaxed">
                  <span className="text-gray-400">{`{`}</span>
                  {"\n  "}
                  <span className="text-blue-400">
                    &quot;mcpServers&quot;
                  </span>
                  <span className="text-gray-400">: {`{`}</span>
                  {"\n    "}
                  <span className="text-blue-400">
                    &quot;tailbus&quot;
                  </span>
                  <span className="text-gray-400">: {`{`}</span>
                  {"\n      "}
                  <span className="text-blue-400">&quot;url&quot;</span>
                  <span className="text-gray-400">: </span>
                  <span className="text-amber-300">
                    &quot;http://localhost:1423/mcp&quot;
                  </span>
                  {"\n    "}
                  <span className="text-gray-400">{`}`}</span>
                  {"\n  "}
                  <span className="text-gray-400">{`}`}</span>
                  {"\n"}
                  <span className="text-gray-400">{`}`}</span>
                </pre>
              </Terminal>
              <p className="text-gray-400 mt-6 mb-6 leading-relaxed">
                Claude and Cursor now see your agents as tools. If your agent
                declared commands in its manifest, each command becomes a
                separate tool:
              </p>
              <div className="rounded-xl bg-gray-900/50 border border-gray-800/50 overflow-hidden">
                <div className="px-5 py-3 border-b border-gray-800/50">
                  <span className="text-xs text-gray-500 font-medium">
                    Available tools
                  </span>
                </div>
                <div className="divide-y divide-gray-800/50">
                  <div className="flex items-center gap-3 px-5 py-3">
                    <div className="w-5 h-5 rounded bg-amber-500/15 flex items-center justify-center shrink-0">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="text-amber-400"
                      >
                        <path d="M6.122.392a1.75 1.75 0 0 1 3.756 0l.71 3.745a.956.956 0 0 0 .771.771l3.745.71a1.75 1.75 0 0 1 0 3.756l-3.745.71a.956.956 0 0 0-.771.771l-.71 3.745a1.75 1.75 0 0 1-3.756 0l-.71-3.745a.956.956 0 0 0-.771-.771L.896 9.874a1.75 1.75 0 0 1 0-3.756l3.745-.71a.956.956 0 0 0 .771-.771L5.412.392Z" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-sm text-amber-400 font-medium">
                        finance.budget
                      </span>
                      <span className="text-xs text-gray-500 ml-2">
                        Check remaining budget
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 px-5 py-3">
                    <div className="w-5 h-5 rounded bg-amber-500/15 flex items-center justify-center shrink-0">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="text-amber-400"
                      >
                        <path d="M6.122.392a1.75 1.75 0 0 1 3.756 0l.71 3.745a.956.956 0 0 0 .771.771l3.745.71a1.75 1.75 0 0 1 0 3.756l-3.745.71a.956.956 0 0 0-.771.771l-.71 3.745a1.75 1.75 0 0 1-3.756 0l-.71-3.745a.956.956 0 0 0-.771-.771L.896 9.874a1.75 1.75 0 0 1 0-3.756l3.745-.71a.956.956 0 0 0 .771-.771L5.412.392Z" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-sm text-amber-400 font-medium">
                        strategy
                      </span>
                      <span className="text-xs text-gray-500 ml-2">
                        no commands — generic send
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Agents with commands get tools named{" "}
                <code className="text-gray-400 bg-gray-800 px-1 py-0.5 rounded text-xs">
                  handle.command
                </code>
                . Agents without commands get a single tool named after
                their handle.
              </p>
            </Step>

            {/* Next steps */}
            <div className="mt-4 p-6 rounded-xl bg-gray-900/50 border border-gray-800/50">
              <h2 className="text-lg font-semibold mb-4">Next steps</h2>
              <ul className="space-y-3 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400/60 mt-0.5 shrink-0">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                    >
                      <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z" />
                    </svg>
                  </span>
                  <span>
                    <strong className="text-gray-300">Install on a second machine</strong>{" "}
                    — run the same install script and login. Agents on both
                    machines discover each other automatically.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400/60 mt-0.5 shrink-0">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                    >
                      <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z" />
                    </svg>
                  </span>
                  <span>
                    <strong className="text-gray-300">Use @-mentions</strong>{" "}
                    — agents can pull other agents into a session mid-conversation
                    by mentioning their handle with @.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400/60 mt-0.5 shrink-0">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                    >
                      <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z" />
                    </svg>
                  </span>
                  <span>
                    <strong className="text-gray-300">Multi-turn sessions</strong>{" "}
                    — use{" "}
                    <code className="text-gray-300 bg-gray-800 px-1 py-0.5 rounded text-xs">
                      agent.send()
                    </code>{" "}
                    instead of{" "}
                    <code className="text-gray-300 bg-gray-800 px-1 py-0.5 rounded text-xs">
                      agent.resolve()
                    </code>{" "}
                    to keep a session open for multiple exchanges before resolving.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400/60 mt-0.5 shrink-0">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                    >
                      <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z" />
                    </svg>
                  </span>
                  <span>
                    <strong className="text-gray-300">
                      Read the full docs
                    </strong>{" "}
                    —{" "}
                    <a
                      href={`https://github.com/${GITHUB_REPO}#readme`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      GitHub README
                    </a>{" "}
                    covers Docker Compose setup, service manifests, tracing, and
                    the full CLI reference.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-8 px-6 border-t border-gray-800/50">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-sm text-gray-500">
          <span>tailbus</span>
          <a
            href={`https://github.com/${GITHUB_REPO}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-300 transition-colors"
          >
            GitHub
          </a>
        </div>
      </footer>
    </>
  );
}
