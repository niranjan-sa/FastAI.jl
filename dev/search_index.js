var documenterSearchIndex = {"docs":
[{"location":"getting-started/#Getting-Started","page":"Getting Started","title":"Getting Started","text":"","category":"section"},{"location":"getting-started/","page":"Getting Started","title":"Getting Started","text":"If you are familiar with fastai in Python, then this package should be familiar to you. Otherwise, this documentation should answer most of your questions. If you find a question unanswered, you can use the Julia Discourse, Zulip group, or Slack group to get an answer (the #machine-learning channels will be of interest). If appropriate, please file an issue on Github so that we can improve our documentation!","category":"page"},{"location":"getting-started/#Installation","page":"Getting Started","title":"Installation","text":"","category":"section"},{"location":"getting-started/","page":"Getting Started","title":"Getting Started","text":"This package is currently unregistered, since it is still in development and unstable. To install it, run the following in the Julia REPL (note pressing ] enters Pkg-mode):","category":"page"},{"location":"getting-started/","page":"Getting Started","title":"Getting Started","text":"] add https://github.com/FluxML/FastAI.jl","category":"page"},{"location":"getting-started/#Troubleshooting","page":"Getting Started","title":"Troubleshooting","text":"","category":"section"},{"location":"getting-started/","page":"Getting Started","title":"Getting Started","text":"If you run into issues and need to troubleshoot, please file an issue or post in the Julia Zulip under the #ml-ecosystem-coordination stream.","category":"page"},{"location":"core/core/#Core-Modules","page":"Overview","title":"Core Modules","text":"","category":"section"},{"location":"core/core/","page":"Overview","title":"Overview","text":"The core modules of fastai. In addition to the fastai core, FastAI.jl defines some functionality available in PyTorch that fastai relies on.","category":"page"},{"location":"core/core/","page":"Overview","title":"Overview","text":"Pages = [\"core/core.md\", \"core/basic-data.md\", \"core/torch-core.md\"]\nDepth = 3","category":"page"},{"location":"core/torch-core/#PyTorch-Core-Modules","page":"Torch Core","title":"PyTorch Core Modules","text":"","category":"section"},{"location":"core/torch-core/","page":"Torch Core","title":"Torch Core","text":"The following modules are PyTorch constructs that fastai builds on, but they don't exist in Julia and Flux.","category":"page"},{"location":"core/torch-core/#Dataset","page":"Torch Core","title":"Dataset","text":"","category":"section"},{"location":"core/torch-core/","page":"Torch Core","title":"Torch Core","text":"A dataset can either be an IterableDataset or a MapDataset. If you want to create a custom dataset, then you should implement one of these two interfaces.","category":"page"},{"location":"core/torch-core/","page":"Torch Core","title":"Torch Core","text":"IterableDataset\nMapDataset","category":"page"},{"location":"core/torch-core/#FastAI.IterableDataset","page":"Torch Core","title":"FastAI.IterableDataset","text":"abstract type IterableDataset\n\nEvery dataset is an IterableDataset representing an iterable of data samples. IterableDataset is particularly useful when data come from a stream.\n\nRequired interface\n\niterate(it<:IterableDataset):   Returns either a tuple of the first item and initial state or nothing if empty\niterate(it<:IterableDataset, state):   Returns either a tuple of the next item and next state or nothing if no items remain\n\nSee Julia iteration documentation for more information (https://docs.julialang.org/en/v1/manual/interfaces/)\n\n\n\n\n\n","category":"type"},{"location":"core/torch-core/#FastAI.MapDataset","page":"Torch Core","title":"FastAI.MapDataset","text":"abstract type MapDataset <: IterableDataset\n\nSome datasets are also MapDatasets that map integer ids to data samples. All MapDatasets are also IterableDatasets.\n\nRequired interface\n\nBase.getindex(md<:MapDataset, idx::Int):   a MapDataset is a indexable type that maps an integer id to a sample.   Legal IDs are between 1 and the length of this dataset.\nBase.getindex(md<:Dataset, rng::UnitRange): returns a contiguous subset of the items in this dataset\nBase.length(md<:MapDataset): returns the number of samples in this MapDataset.   Used by many Sampler implementations and the default options of DataLoader.\n\n\n\n\n\n","category":"type"},{"location":"core/torch-core/","page":"Torch Core","title":"Torch Core","text":"There are also several dataset types that represent combinations of datasets. If ds1, ds2, ..., dsn are the same kind of dataset, then ds1 ++ ds2 ++ ... ++ dsn will be a combined dataset of that sort. If IterableDatasets and MapDatasets are combined, the result will be an IterableDataset. This is useful to assemble different existing dataset streams. The chainning operation is done on-the-fly, so concatenating large-scale IterableDatasets with this type will be efficient.","category":"page"},{"location":"core/torch-core/","page":"Torch Core","title":"Torch Core","text":"FastAI.ConcatDataset\nFastAI.ChainDataset\nFastAI.:++","category":"page"},{"location":"core/torch-core/#FastAI.ConcatDataset","page":"Torch Core","title":"FastAI.ConcatDataset","text":"struct ConcatDataset <: MapDataset\n\nConcatDataset(ds1::MapDataset, ds2::MapDataset)\n\nTwo MapDatasets concatenated together.\n\n\n\n\n\n","category":"type"},{"location":"core/torch-core/#FastAI.ChainDataset","page":"Torch Core","title":"FastAI.ChainDataset","text":"struct ChainDataset <: IterableDataset\n\nChainDataset(ds1::IterableDataset, ds2::IterableDataset)\n\nA sequence of IterableDatasets.\n\n\n\n\n\n","category":"type"},{"location":"core/torch-core/#FastAI.:++","page":"Torch Core","title":"FastAI.:++","text":"++(ds1::MapDataset, ds2::MapDataset) -> FastAI.ConcatDataset\n\n\nConcatenate two MapDatasets into a ConcatDataset.\n\n\n\n\n\n++(ds1::IterableDataset, ds2::IterableDataset) -> FastAI.ConcatDataset\n\n\nCombine two or more IterableDatasets into ChainDataset. Note: if all the datasets are MapDatasets, then the result is a ConcatDataset,   but any other combination will result in a ChainDataset.\n\n\n\n\n\n","category":"function"},{"location":"core/torch-core/","page":"Torch Core","title":"Torch Core","text":"Lastly, we can also take random and fixed subsets of a MapDataset.","category":"page"},{"location":"core/torch-core/","page":"Torch Core","title":"Torch Core","text":"FastAI.SubsetDataset\nFastAI.subset\nFastAI.random_split","category":"page"},{"location":"core/torch-core/#FastAI.SubsetDataset","page":"Torch Core","title":"FastAI.SubsetDataset","text":"struct SubsetDataset <: MapDataset\n\nA subset of a MapDataset.\n\n\n\n\n\n","category":"type"},{"location":"core/torch-core/#FastAI.subset","page":"Torch Core","title":"FastAI.subset","text":"subset(dataset::MapDataset, indices::Array{Int64,N} where N) -> FastAI.SubsetDataset\n\n\nA SubsetDataset of dataset at indices.\n\n\n\n\n\n","category":"function"},{"location":"core/torch-core/#FastAI.random_split","page":"Torch Core","title":"FastAI.random_split","text":"random_split(dataset::MapDataset, lengths::Array{Int64,N} where N) -> Array{Any,1}\n\n\nRandomly split dataset into non-overlapping new SubsetDatasets of given lengths.\n\n\n\n\n\n","category":"function"},{"location":"core/basic-data/#Basic-Data","page":"Basic Data","title":"Basic Data","text":"","category":"section"},{"location":"core/basic-data/","page":"Basic Data","title":"Basic Data","text":"Basic types to contain the data for model training. This module defines the basic DataBunch struct that is used inside Learner to train a model. The fields are generic and can take any kind of fastai dataset (see IterableDataset and MapDataset) or Flux.Data.DataLoader. You'll find helpful functions in the data module of every application to directly create this DataBunch for you.","category":"page"},{"location":"core/basic-data/","page":"Basic Data","title":"Basic Data","text":"DataBunch","category":"page"},{"location":"core/basic-data/#FastAI.DataBunch","page":"Basic Data","title":"FastAI.DataBunch","text":"struct DataBunch\n\nDataBunch(train::Flux.Data.DataLoader, valid::Flux.Data.DataLoader)\n\nA DataBunch is a bunched train and valid (validation) dataloader.\n\n\n\n\n\n","category":"type"},{"location":"training/basic-train/#Basic-Training-Functionality","page":"Basic Train","title":"Basic Training Functionality","text":"","category":"section"},{"location":"training/basic-train/","page":"Basic Train","title":"Basic Train","text":"Basic training wraps together the data (in a DataBunch object) with a Flux model to define a Learner object. The Learner object is the entry point of most of the Callback objects that will customize this training loop in different ways.","category":"page"},{"location":"training/basic-train/#Learner","page":"Basic Train","title":"Learner","text":"","category":"section"},{"location":"training/basic-train/","page":"Basic Train","title":"Basic Train","text":"A Learner type wraps a DataBunch with a model and optimizer. The model can then be fit using the optimizer by training it for several epochs. The training process is customized by adding Callbacks to the Learner.","category":"page"},{"location":"training/basic-train/","page":"Basic Train","title":"Basic Train","text":"Learner\nadd_cb!\nFastAI.cbs\ndata_bunch\nFastAI.data_bunch!\nmodel\nFastAI.model!\nloss\nloss!\nopt\nopt!","category":"page"},{"location":"training/basic-train/#FastAI.Learner","page":"Basic Train","title":"FastAI.Learner","text":"mutable struct Learner <: AbstractLearner\n\nLearner(data_bunch, model; opt = Flux.ADAM(), loss = Flux.mse)\n\nA Learner is the standard grouping of a data bunch, model, optimizer, and loss.\n\n\n\n\n\n","category":"type"},{"location":"training/basic-train/#FastAI.add_cb!","page":"Basic Train","title":"FastAI.add_cb!","text":"add_cb!(learner::Learner, cb::AbstractCallback) -> Array{AbstractCallback,1}\n\n\nAdd cb to the list of callbacks for learner.\n\n\n\n\n\n","category":"function"},{"location":"training/basic-train/#FastAI.cbs","page":"Basic Train","title":"FastAI.cbs","text":"cbs(learner::Learner) -> Array{AbstractCallback,N} where N\n\n\nGet the list of callbacks for learner.\n\n\n\n\n\n","category":"function"},{"location":"training/basic-train/#FastAI.data_bunch","page":"Basic Train","title":"FastAI.data_bunch","text":"data_bunch(l::Learner) -> DataBunch\n\n\nGet the data bunch for l.\n\n\n\n\n\n","category":"function"},{"location":"training/basic-train/#FastAI.data_bunch!","page":"Basic Train","title":"FastAI.data_bunch!","text":"data_bunch!(l::Learner, data_bunch::Any) -> Any\n\n\nSet the data bunch for l to data_bunch.\n\n\n\n\n\n","category":"function"},{"location":"training/basic-train/#FastAI.model","page":"Basic Train","title":"FastAI.model","text":"model(l::Learner) -> Any\n\n\nGet the model for l.\n\n\n\n\n\n","category":"function"},{"location":"training/basic-train/#FastAI.model!","page":"Basic Train","title":"FastAI.model!","text":"model!(l::Learner, model::Any) -> Any\n\n\nSet the model for l to model.\n\n\n\n\n\n","category":"function"},{"location":"training/basic-train/#FastAI.loss","page":"Basic Train","title":"FastAI.loss","text":"loss(l::Learner) -> Any\n\n\nGet the loss for l.\n\n\n\n\n\n","category":"function"},{"location":"training/basic-train/#FastAI.loss!","page":"Basic Train","title":"FastAI.loss!","text":"loss!(l::Learner, loss::Any) -> Any\n\n\nSet the loss for l to loss.\n\n\n\n\n\n","category":"function"},{"location":"training/basic-train/#FastAI.opt","page":"Basic Train","title":"FastAI.opt","text":"opt(l::Learner) -> Any\n\n\nGet the optimizer for l.\n\n\n\n\n\n","category":"function"},{"location":"training/basic-train/#FastAI.opt!","page":"Basic Train","title":"FastAI.opt!","text":"opt!(l::Learner, opt::Any) -> Any\n\n\nSet the optimizer for l to opt.\n\n\n\n\n\n","category":"function"},{"location":"training/basic-train/#AbstractLearner-Interface","page":"Basic Train","title":"AbstractLearner Interface","text":"","category":"section"},{"location":"training/basic-train/","page":"Basic Train","title":"Basic Train","text":"If you want to create a custom learner, you can implement the AbstractLearner interface.","category":"page"},{"location":"training/basic-train/","page":"Basic Train","title":"Basic Train","text":"AbstractLearner","category":"page"},{"location":"training/basic-train/#FastAI.AbstractLearner","page":"Basic Train","title":"FastAI.AbstractLearner","text":"abstract type AbstractLearner\n\nAn AbstractLearner groups together a model, train and validate data,   optimizer, loss function and callbacks.\n\nCallbacks are used for every tweak of the training loop. Callbacks receive epoch, batch and loss information which they may pass on to Metrics.\n\nRequire interface\n\ndata_bunch(l::AbstractLearner)\ndata_bunch!(l::AbstractLearner, data_bunch)\nmodel(l::AbstractLearner)\nmodel!(l::AbstractLearner, model)\nloss(l::AbstractLearner)\nloss!(l::AbstractLearner, loss)\nopt(l::AbstractLearner)\nopt!(l::AbstractLearner, opt)\nadd_cb!(learner::AbstractLearner, cb::AbstractCallback)\ncbs(learner::AbstractLearner)\nfit!(learner::AbstractLearner, epoch_count)\n\n\n\n\n\n","category":"type"},{"location":"training/basic-train/#Recorder","page":"Basic Train","title":"Recorder","text":"","category":"section"},{"location":"training/basic-train/","page":"Basic Train","title":"Basic Train","text":"A Recorder logs the values of metrics throughout the training history.","category":"page"},{"location":"training/basic-train/","page":"Basic Train","title":"Basic Train","text":"Recorder\nFastAI.add!(::Recorder, ::Any, ::Any, ::Any)\nFastAI.log!","category":"page"},{"location":"training/basic-train/#FastAI.Recorder","page":"Basic Train","title":"FastAI.Recorder","text":"struct Recorder\n\nRecorder(learn::Learner; train_loss = true, train_smooth_loss = true,\n                         validate_loss = true, validate_smooth_loss = true)\n\nContainer for Learner statistics (e.g. lr, loss and metrics) during training. Statistics are indexed by name, epoch and batch. For example to get the smoothed training loss for epoch 2, batch 3, we would call\n\nrecorder[\"TrainSmoothLoss\", 2, 3]\n\nTo get the entire history of smooth training loss, one would call\n\nrecorder[\"TrainSmoothLoss\", :, :]\n\n\n\n\n\n","category":"type"},{"location":"training/basic-train/#FastAI.add!-Tuple{Recorder,Any,Any,Any}","page":"Basic Train","title":"FastAI.add!","text":"add!(rec::Recorder, name::Any, epoch_count::Any, batch_size::Any) -> Any\n\n\nAdd name to rec to be tracked.\n\n\n\n\n\n","category":"method"},{"location":"training/basic-train/#FastAI.log!","page":"Basic Train","title":"FastAI.log!","text":"log!(rec::Recorder, name::String, epoch::Int64, batch::Int64, value::Any) -> Any\n\n\nLog value to rec[name, epoch, batch].\n\n\n\n\n\n","category":"function"},{"location":"#FastAI","page":"Home","title":"FastAI","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"A port of fastai v2 to Julia.","category":"page"},{"location":"","page":"Home","title":"Home","text":"(Image: Logo)","category":"page"},{"location":"","page":"Home","title":"Home","text":"This code is inspired by fastai, but differs in implementation in several ways. Most importantly, the original Python code makes heavy use of side-effects where the Learner holds different state variables, and other objects access and modify them.","category":"page"},{"location":"","page":"Home","title":"Home","text":"This has been replaced by a more functional design. The state is now transmitted via arguments to Callbacks which may then pass them on to Metrics.","category":"page"},{"location":"","page":"Home","title":"Home","text":"Note: this is a package in-development. Expect breaking changes for the foreseeable future, but we want you to test out the package by following the documentation. Any contributions are welcome via PRs/issues.","category":"page"},{"location":"","page":"Home","title":"Home","text":"Much of the documentation has been copied from the original Python, and modified where appropriate.","category":"page"},{"location":"","page":"Home","title":"Home","text":"The original source is can be found at https://github.com/fastai/fastai/blob/master/fastai/. The original documentation can be found at http://docs.fast.ai.","category":"page"},{"location":"training/training/#Training","page":"Overview","title":"Training","text":"","category":"section"},{"location":"training/training/","page":"Overview","title":"Overview","text":"Pages = [\"training/training.md\", \"training/basic-train.md\"]\nDepth = 3","category":"page"}]
}
