Func<string, string, IEnumerable<string>> files = (dir, patt) =>  
    new System.IO.DirectoryInfo(dir).GetFiles(patt).Select(x => x.FullName);

Action<String> delete =  (f) => {
    Console.WriteLine("delete -- " + f);
    System.IO.File.Delete(f);
};

Action<IEnumerable<string>> clean = (fs) => fs.ToList().ForEach(delete);

Task("Clean").Does(() =>{
    clean(files("lib", "*.map"));
    clean(files("lib", "*.js"));
    clean(files("test", "*.map"));
    clean(files("test", "*.js"));
    delete("server.js.map");
    delete("server.js");
});

Action<string, string> run = (cmd, args) => StartProcess(cmd, new ProcessSettings { Arguments = args });

Task("Build").Does(() => run("node", "node_modules/typescript/lib/tsc.js"));
Task("Test").Does(() => run("mocha", "test"));

var target = Argument("Target", "Default");
RunTarget(target);